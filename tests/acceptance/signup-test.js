import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit, currentURL, click, find, fillIn, settled, pauseTest} from '@ember/test-helpers';
import { faker } from 'ember-cli-mirage';


module('Acceptance | signup', function(hooks) {
  setupApplicationTest(hooks);

  test('filling in signup form', async function(assert) {
    await visit('/signup');
    assert.equal(currentURL(), '/signup');

    const controller = this.owner.lookup('controller:signup/index');

    const fakeData = {
      company:faker.name.firstName(),
      firstName:faker.name.firstName(),
      middleName:faker.name.firstName(),
      lastName:faker.name.lastName(),
      email:faker.internet.email(),
      phone:'(406) 567-6354',
      extension:faker.random.number(),
      street:faker.address.streetAddress(),
      suite:faker.random.number(),
      city:faker.address.city(),
      state:faker.address.state(),
      zip:faker.random.number({min:11111, max:99999})
    };

    assert.ok(!controller.get('model.name'),'Company name on model is undefined before fillIn');
    assert.ok(!controller.get('model.contactFirstName'),'First Name on model is undefined before fillIn');
    assert.ok(!controller.get('model.contactMiddleName'),'Middle Name on model is undefined before fillIn');
    assert.ok(!controller.get('model.contactLastName'),'Last Name on model is undefined before fillIn');
    assert.ok(!controller.get('model.email'),'Email on model is undefined before fillIn');
    assert.ok(!controller.get('model.contactPhone'),'Phone on model is undefined before fillIn');
    assert.ok(!controller.get('model.contactExtension'),'Extention on model is undefined before fillIn');
    assert.ok(!controller.get('model.contactExtension'),'Extention on model is undefined before fillIn');
    assert.ok(!controller.get('model.addressLine1'),'Street address on model is undefined before fillIn');
    assert.ok(!controller.get('model.addressLine2'),'Suite on model is undefined before fillIn');
    assert.ok(!controller.get('model.addressCity'),'City on model is undefined before fillIn');
    assert.ok(!controller.get('model.addressZipCode'),'Zip on model is undefined before fillIn');

    await fillIn('#company-name input', fakeData.company);
    await fillIn('#first-name input', fakeData.firstName);
    await fillIn('input[placeholder="Middle(Optional)"]', fakeData.middleName);
    await fillIn('#last-name input', fakeData.lastName);
    await fillIn('#company-email input', fakeData.email);
    await fillIn('input[placeholder="Phone Number"]', fakeData.phone);
    await fillIn('input[placeholder="Extension"]', fakeData.extension);
    await fillIn('#street-address input', fakeData.street);
    await fillIn('#suite-number input', fakeData.suite);
    await fillIn('#city input', fakeData.city);
    await fillIn('#zipcode input', fakeData.zip);
    await fillIn('#url-prefix input', fakeData.company);

    assert.equal(controller.get('model.name'),fakeData.company, `Company name on model is "${fakeData.company}" afer fillIn`);

    assert.equal(controller.get('model.contactFirstName'),fakeData.firstName, `First Name on model is "${fakeData.firstName}" after fillIn`);
    assert.equal(controller.get('model.contactMiddleName'),fakeData.middleName, `Middle Name on model is "${fakeData.middleName}" after fillIn`);
    assert.equal(controller.get('model.contactLastName'),fakeData.lastName, `Last Name on model is "${fakeData.lastName}" after fillIn`);
    assert.equal(controller.get('model.email'),fakeData.email, `Email on model is "${fakeData.email}" after fillIn`);
    assert.equal(controller.get('model.contactPhone'),fakeData.phone,`Phone on model is "${fakeData.phone}" after fillIn`);
    assert.equal(controller.get('model.contactExtension'),fakeData.extension,`Extention on model is "${fakeData.extension}" after fillIn`);
    assert.equal(controller.get('model.addressLine1'), fakeData.street,`Street address on model is "${fakeData.street}" after fillIn`);
    assert.equal(controller.get('model.addressLine2'),fakeData.suite,`Suite on model is "${fakeData.suite}" after fillIn`);
    assert.equal(controller.get('model.addressCity'),fakeData.city,`City on model is "${fakeData.city}" after fillIn`);
    assert.equal(controller.get('model.addressZipCode'),fakeData.zip,`Zip on model is "${fakeData.zip}" after fillIn`);
    assert.equal(controller.get('model.urlPrefix'),fakeData.company,`URL on model is https://"${fakeData.company}".granitehr.com after fillIn`);

    await click('.select__address-state');
    await new Promise(resolve => setTimeout(resolve, 500));

    await click(`.select__address-state .select-address-state__item[data-id="${fakeData.state}"]`);
    await settled();
    const stateSel = [controller.get('model.addressState')[0].innerHTML.trim()];
    assert.equal(stateSel,fakeData.state, `the state dropdown is ${fakeData.state}`);

    await click('button[type="submit"]');
    await settled();
    assert.equal(currentURL(), '/signup/billing');

    const billingController = this.owner.lookup('controller:signup/billing');

    assert.ok(find('button[type="submit"]').disabled, 'Submit is disabled');
    billingController.set('nonce', 'fake-valid-nonce');
    await settled();
    assert.ok(!find('button[type="submit"]').disabled, 'Submit is enabled');
    click('button[type="submit"]');
    await new Promise(resolve => setTimeout(resolve, 700));
    assert.equal(currentURL(), '/signup/finish', 'signup/finish is loaded');
    await settled();
    assert.equal(currentURL(), '/', 'brought you back to the index page');




    /*
      TODO

      - Test for payment method hit on mirage
      x Test url is finished
      x Test transition to index after "finished" animation
    */
  });

});
