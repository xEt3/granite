import { module, test } from 'qunit';
import authenticate from 'granite/tests/helpers/auth';
import { visit, currentURL, click, find, findAll, settled, fillIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | company users', function (hooks) {
  setupApplicationTest(hooks);

  test('getting to company-users', async function (assert) {
    await authenticate.call(this, server);
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
    let $listItems = findAll('.text.segment .item')[1];
    assert.ok($listItems.textContent.trim().toLowerCase().replace(/\s\s+/g, ' ').indexOf('old yeller') > -1, 'List items should contain "old yeller"');
  });

  test('adding new user with permissions', async function (assert) {
    await server.create('employees');
    await server.createList('permissions', 8);
    await authenticate.call(this, server);
    await visit('account/anatomy/company-users');

    assert.equal(currentURL(), 'account/anatomy/company-users');
    await click('.plus');
    await settled();
    assert.equal(currentURL(), '/account/anatomy/company-users/new');
    assert.ok(find('input[type="email"]'), 'Email input on page');
    assert.ok(find('div[class="text default"]'), 'Employee dropdown on page');

    await click('div[class="text default"]');
    await fillIn('input[type="email"]', 'testuser@test.com');
    assert.equal(findAll('.node').length, 5, '5 permissions are shown');
    assert.equal(findAll('.toggle-icon').length, 5, '5 permissions have dropdowns');

    await click('span[class="toggle-icon"]');
    await click('input[type="checkbox"]');
    await click('button[type="submit"]');

    assert.equal(currentURL(), '/account/anatomy/company-users');
  });

  test('editing user\'s permissions', async function (assert) {
    await authenticate.call(this, server);
    await server.create('employees');
    await server.createList('permissions', 8);
    await visit('account/anatomy/company-users');

    assert.equal(currentURL(), 'account/anatomy/company-users');
    await click('i[class="edit icon"]');

    assert.equal(currentURL(), '/account/anatomy/company-users/edit/1');
    assert.ok(find('h1[class="ui header left floated"]'), 'Header on page on page');
    assert.equal(findAll('.node').length, 5, '5 permissions are shown');
    assert.equal(findAll('.toggle-icon').length, 5, '5 permissions have dropdowns');

    await click('span[class="toggle-icon"]');
    await click('input[type="checkbox"]');
    await click('button[type="submit"]');

    assert.equal(currentURL(), '/account/anatomy/company-users');
  });
});
