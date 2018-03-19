import { module, test } from 'qunit';
import { visit, currentURL, find, fillIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import Mirage, { faker } from 'ember-cli-mirage';

module('Acceptance | signup', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /signup', async function(assert) {
    await visit('/signup');

    assert.equal(currentURL(), '/signup');
  });

  test('filling in signup form', async function(assert) {
    await visit('/signup');
      var el = document.querySelector("[name='phone-number']");
  const company=faker.company.companyName();
  const firstName=faker.name.firstName();
  const middleName=faker.name.firstName();
  const lastName=faker.name.lastName();
  const email=faker.internet.email();
  const phone=faker.phone.phoneNumber();
  const extension=faker.random.number();
  const street=faker.address.streetAddress();
  const suite=faker.random.number();
  const city=faker.address.city();
  const state=faker.address.state();
  const zip=faker.address.zipCode();
  await fillIn('#company-name input', company);
  await fillIn('#first-name input', firstName);
  //await fillIn('#middle-name input', firstName);
  await fillIn('#last-name input', lastName);
  await fillIn('#company-email input', email);
  //await fillIn('el input', phone);
  //await fillIn('#phone-extension input', extension;
  await fillIn('#street-address input', street);
  await fillIn('#suite-number input', suite);
  await fillIn('#city input', city);
  //await fillIn('#address-state input', state);
  await fillIn('#zipcode input', zip);




  assert.equal(find('#company-name input').value,company,"the company is "+ company);
  assert.equal(find('#first-name input').value,firstName,"First name is "+ firstName);
  //assert.equal(find('#middle-name input').value,firstName,"First name is "+ firstName);
  assert.equal(find('#last-name input').value,lastName,"Last name is "+ lastName);

  assert.equal(find('#company-email input').value,email,"the Email is "+ email);
  assert.equal(find('#street-address input').value,street,"the Address is "+ street);
  assert.equal(find('#suite-number input').value,suite,"the Suite is "+ suite);
  assert.equal(find('#city input').value,city,"the city is "+ city);
  assert.equal(find('#zipcode input').value,zip,"the zip is "+ zip);

assert.ok(find(el), "hell yeah"+el.value)

  });

});
