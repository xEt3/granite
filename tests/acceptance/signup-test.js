import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit, currentURL, click, find, fillIn, settled } from '@ember/test-helpers';
import Mirage, { faker } from 'ember-cli-mirage';


module('Acceptance | signup', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /signup', async function(assert) {
    await visit('/signup');

    assert.equal(currentURL(), '/signup');
  });

  test('filling in signup form', async function(assert) {
    await visit('/signup');
    const controller = this.owner.lookup('controller:signup/index');
    const fakeData = {
      company:faker.company.companyName(),
      firstName:faker.name.firstName(),
      middleName:faker.name.firstName(),
      lastName:faker.name.lastName(),
      email:faker.internet.email(),
      phone:faker.phone.phoneNumber(),
      extension:faker.random.number(),
      street:faker.address.streetAddress(),
      suite:faker.random.number(),
      city:faker.address.city(),
      state:faker.address.state(),
      zip:faker.address.zipCode()
    };

    assert.ok(!controller.get('model.name'),'Company name on model is undefined before fillIn');
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
    assert.equal(find('#first-name input').value,fakeData.firstName,'First name is ' + fakeData.firstName);
    assert.equal(find('input[placeholder="Middle(Optional)"]').value,fakeData.middleName,'Middle name is ' + fakeData.middleName);
    assert.equal(find('#last-name input').value,fakeData.lastName,'Last name is ' + fakeData.lastName);


    assert.equal(find('input[placeholder=\'Phone Number\']').value,fakeData.phone,'the phone number is ' + fakeData.phone);
    assert.equal(find('input[placeholder=\'Extension\']').value,fakeData.extension,'the phone number extention is ' + fakeData.extension);
    assert.equal(find('#company-email input').value,fakeData.email,'the Email is ' + fakeData.email);
    assert.equal(find('#street-address input').value,fakeData.street,'the Address is ' + fakeData.street);
    assert.equal(find('#suite-number input').value,fakeData.suite,'the Suite is ' + fakeData.suite);
    assert.equal(find('#city input').value,fakeData.city,'the city is ' + fakeData.city);
    assert.equal(find('#zipcode input').value,fakeData.zip,'the zip is ' + fakeData.zip);
    assert.equal(find('#url-prefix input').value,fakeData.company, 'urlPrefix shows ' + fakeData.company);

    await click('.select__address-state');
    await new Promise(resolve => setTimeout(resolve, 500));

    assert.ok(find('.select__address-state .menu.visible'), 'Menu gets the visible class');
    await click('.select__address-state .select-address-state__item[data-id="Montana"]');
    await settled();
    assert.equal(controller.get('model.addressState'), 'Montana');



  });







});
