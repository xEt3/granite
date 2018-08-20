import { test } from 'qunit';
import moduleForAcceptance from 'granite/tests/helpers/module-for-acceptance';
import authenticate from 'granite/tests/helpers/auth';

moduleForAcceptance('Acceptance | company users');

test('getting to company-users', function(assert) {
  authenticate(this.application);
  visit('/account/dashboard');

  andThen(() => {
    assert.equal(currentURL(), '/account/dashboard');
    click('.ui.menu.account__navigation > a');
  });

  andThen(() => {
    click('.account__sidebar > a[href="/account/anatomy"]');
  });

  andThen(() => {

    let tab = '.ui.menu a[href="/account/anatomy/company-users"]';
    assert.equal(currentURL(), '/account/anatomy');
    assert.ok(find(tab)[0], 'Tab shows');
    click(tab);
  });

  andThen(() => {
    assert.equal(currentURL(), '/account/anatomy/company-users');
    assert.equal(find('.account__breadcrumb').text().replace(/\s\s+|\n/g, ''), 'Account/Anatomy/Company Users');
    assert.ok(find('a[href="/account/anatomy/company-users/new"]')[0], 'Add link exists');
    let $listItems = find('.text.segment .item');
    assert.ok($listItems.text().toLowerCase().replace(/\s\s+/g, ' ').indexOf('old yeller') > -1, 'List items should contain "old yeller"');
  });
});

test('adding new user with permissions', function(assert) {
  server.create('employees');
  server.create('permissions');
  authenticate(this.application);
  visit('account/anatomy/company-users');


  andThen(() => {
    assert.equal(currentURL(), 'account/anatomy/company-users');
    click('.plus');
  });

  andThen(() => {
    assert.equal(currentURL(), '/account/anatomy/company-users/new');
    assert.ok(find('input[type="email"]'), 'Email input on page');
    assert.ok(find('div[class="default text"]'), 'Employee dropdown on page');

    click('div[class="default text"]');
    fillIn('input[type="email"]', 'testuser@test.com');
  });

  andThen(() => {
    pauseTest();

    assert.ok(find('label[class="node"]')[0], 'Permission names on page');
    assert.ok(find('span[class="toggle-icon"]')[4], '5 Permissions have a dropdown');

    click('span[class="toggle-icon"]');
    click('input[type="checkbox"]');
    click('button[type="submit"]');
  });

  andThen(() => {
    assert.equal(currentURL(), '/account/anatomy/company-users');
  });
});

test('editing user\'s permissions', function(assert) {
  authenticate(this.application);
  server.create('employees');
  server.create('permissions');
  visit('account/anatomy/company-users');

  andThen(() => {
    assert.equal(currentURL(), 'account/anatomy/company-users');
    click('i[class="edit icon"]');
  });

  andThen(() => {
    assert.equal(currentURL(), '/account/anatomy/company-users/edit/1');
    assert.ok(find('h1[class="ui header left floated"]'), 'Header on page on page');
    assert.ok(find('ul[class="tree-branch"]'), 'group of permissions on page');
    assert.ok(find('span[class="toggle-icon"]')[4], '5 Permissions have a dropdown');

    click('span[class="toggle-icon"]');
    click('input[type="checkbox"]');
    click('button[type="submit"]');
  });

  andThen(() => {
    assert.equal(currentURL(), '/account/anatomy/company-users');
  });
});
