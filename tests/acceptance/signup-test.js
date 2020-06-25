import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit, currentURL, click, find, fillIn, settled } from '@ember/test-helpers';
import faker from 'faker';

const fieldMap = {
  name:              '#company-name input',
  contactFirstName:  '#first-name input',
  contactMiddleName: 'input[placeholder="Middle(Optional)"]',
  contactLastName:   '#last-name input',
  email:             '#company-email input',
  contactPhone:      'input[placeholder="Phone Number"]',
  contactExtension:  'input[placeholder="Extension"]',
  addressLine1:      '#street-address input',
  addressLine2:      '#suite-number input',
  addressCity:       '#city input',
  addressZipcode:    '#zipcode input',
  urlPrefix:         '#url-prefix input'
};

module('Acceptance | signup', function (hooks) {
  setupApplicationTest(hooks);

  test('signup through test', async function (assert) {
    await visit('/signup');
    assert.equal(currentURL(), '/signup');

    const controller = this.owner.lookup('controller:signup/index');

    const fakeData = {
      name:              faker.company.companyName(),
      contactFirstName:  faker.name.firstName(),
      contactMiddleName: faker.name.firstName(),
      contactLastName:   faker.name.lastName(),
      email:             faker.internet.email(),
      contactPhone:      '(406) 567-6354',
      contactExtension:  faker.random.number(),
      addressLine1:      faker.address.streetAddress(),
      addressLine2:      faker.random.number(),
      addressCity:       faker.address.city(),
      state:             faker.address.state(),
      addressZipcode:    faker.random.number({
        min: 11111,
        max: 99999
      }),
      urlPrefix: 'abc'
    };

    let model = controller.get('model');

    // Assure that all fields are undefined
    Object.keys(fieldMap).forEach(key =>
      assert.ok(!model.get(key), `model.${key} is undefined before fillIn`));

    // Fill in fields
    for (let key in fieldMap) {
      if (!Object.prototype.hasOwnProperty.call(fieldMap, key)) {
        continue;
      }

      await fillIn(fieldMap[key], fakeData[key]);
    }

    // Assure filled in fields are set on the model
    Object.keys(fieldMap).forEach(key =>
      assert.equal(model.get(key), fakeData[key], `model.${key} is "${fakeData[key]}" after fillIn`));

    await click('.select__address-state');
    await new Promise(resolve => setTimeout(resolve, 500));

    await click(`.select__address-state .select-address-state__item[data-id="${fakeData.state}"]`);
    await settled();
    const stateSel = controller.get('model.addressState');
    assert.equal(stateSel, fakeData.state, `the state dropdown is ${fakeData.state}`);

    await click('button[type="submit"]');
    await settled();
    assert.equal(currentURL(), '/signup/billing');
    await new Promise(resolve => setTimeout(resolve, 5000));

    const billingController = this.owner.lookup('controller:signup/billing');

    let discount = server.create('discount', {
      code:   'ABC',
      type:   'percent',
      amount: 100
    });

    await click('a.link__promo-toggle');
    assert.dom('.container__promo-code').exists();
    await fillIn('.promo-code__input', discount.code);
    await click('button.promo-code__apply');
    await settled();
    assert.dom('.promo-code__applied').includesText('"ABC" for 100% off');
    assert.equal(billingController.get('model.accountBillingPromo'), 'ABC');

    assert.ok(find('button[type="submit"]').disabled, 'Submit is disabled');
    billingController.set('nonce', 'fake-valid-nonce');
    await settled();

    let company = server.db.companies.where({ name: fakeData.name })[0];
    assert.ok(company, 'Company exists');
    assert.ok(!find('button[type="submit"]').disabled, 'Submit is enabled');
    click('button[type="submit"]');
    await new Promise(resolve => setTimeout(resolve, 1000));

    let paymentMethod = server.db.paymentMethods.where({ company: company.id })[0];

    assert.ok(paymentMethod, 'Payment method exists');
    assert.equal(paymentMethod.nonce, 'fake-valid-nonce', 'Nonce is equal to the one set in billing controller');
    assert.equal(currentURL(), '/signup/finish', 'signup/finish is loaded');
    await settled();
    assert.equal(currentURL(), '/', 'brought you back to the index page');
  });

  test('field errors implemented in signup (for urlPrefix)', async function (assert) {
    await visit('/signup');
    assert.equal(currentURL(), '/signup');

    const controller = this.owner.lookup('controller:signup/index');

    const fakeData = {
      name:      faker.company.companyName(),
      urlPrefix: 'abc'
    };

    let model = controller.get('model');

    // Assure that all fields are undefined
    Object.keys(fieldMap).forEach(key =>
      assert.ok(!model.get(key), `model.${key} is undefined before fillIn`));

    // Fill in fields
    for (let key in fieldMap) {
      if (!Object.prototype.hasOwnProperty.call(fieldMap, key) || !fakeData[key]) {
        continue;
      }

      await fillIn(fieldMap[key], fakeData[key]);
    }

    // Assure filled in fields are set on the model
    Object.keys(fieldMap).forEach(key =>
      assert.equal(model.get(key), fakeData[key], `model.${key} is "${fakeData[key]}" after fillIn`));

    controller.set('fieldErrors', { urlPrefix: 'URL Prefix "abc" has already been used.' });

    await settled();
    assert.dom('#url-prefix input + .check').doesNotExist();
    assert.dom('#url-prefix input + .input-error').exists();
    assert.dom('#url-prefix input + .input-error > .error').includesText(controller.get('fieldErrors.urlPrefix'));
  });
});
