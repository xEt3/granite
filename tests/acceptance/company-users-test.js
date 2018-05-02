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
