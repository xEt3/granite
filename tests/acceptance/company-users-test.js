import { module, test } from 'qunit';
import authenticate from 'granite/tests/helpers/auth';
import { visit, currentURL, click, find, findAll, settled, fillIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | company users', function (hooks) {
  setupApplicationTest(hooks);

  test('getting to company-users', async function (assert) {
    await authenticate.call(this, server, {
      companyUser: {
        firstName: 'old',
        lastName:  'yeller'
      }
    });

    await visit('/account/dashboard');
    assert.equal(currentURL(), '/account/dashboard');

    await click('.ui.menu.account__navigation > a');
    await click('.account__sidebar > a[href="/account/anatomy"]');
    let tab = '.ui.menu a[href="/account/anatomy/company-users"]';
    assert.equal(currentURL(), '/account/anatomy');
    assert.ok(find(tab), 'Tab shows');

    await click(tab);
    assert.equal(currentURL(), '/account/anatomy/company-users');
    assert.equal(find('.account__breadcrumb').textContent.trim().replace(/\s\s+|\n/g, ''), 'Account/Anatomy/Company Users');
    assert.ok(find('a[href="/account/anatomy/company-users/new"]'), 'Add link exists');
    assert.dom('div.content > div.header').hasText('old yeller');
  });

  test('adding new user with permissions', async function (assert) {
    await server.create('employee');
    await server.createList('permission', 8);
    await authenticate.call(this, server);
    await visit('/account/anatomy/company-users');

    assert.equal(currentURL(), '/account/anatomy/company-users');
    await click('.plus');
    await settled();
    assert.equal(currentURL(), '/account/anatomy/company-users/new');
    assert.ok(find('input[type="email"]'), 'Email input on page');
    assert.dom('#user-employee-link > i.dropdown.icon').exists();

    await click('#user-employee-link > i.dropdown.icon');
    await fillIn('input[type="email"]', 'testuser@test.com');
    assert.equal(findAll('.node').length, 5, '5 permissions are shown');
    assert.equal(findAll('.toggle-icon').length, 5, '5 permissions have dropdowns');

    await click('div.menu.transition > div.item');
    await click('span[class="toggle-icon"]');
    await click('input[type="checkbox"]');
    await click('button[type="submit"]');

    assert.equal(currentURL(), '/account/anatomy/company-users', 'current url is /account/anatomy/company-users');
  });

  test('editing user\'s permissions', async function (assert) {
    let permissions = await server.createList('permission', 8).map(p => {
      return p.id;
    });

    let companyUser = await authenticate.call(this, server, { companyUser: { permissions } });

    await visit('/account/anatomy/company-users');

    assert.equal(currentURL(), '/account/anatomy/company-users');
    await click('i[class="edit icon"]');
    assert.equal(currentURL(), `/account/anatomy/company-users/edit/${companyUser.employee.companyUser}`);
    assert.ok(find('h1[class="ui header left floated"]'), 'Header on page on page');
    assert.equal(findAll('.node').length, 5, '5 permissions are shown');
    assert.equal(findAll('.toggle-icon').length, 5, '5 permissions have dropdowns');

    await click('span[class="toggle-icon"]');
    await click('input[type="checkbox"]');
    await click('button[type="submit"]');

    assert.equal(currentURL(), '/account/anatomy/company-users');
  });
});
