import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import authenticate from 'granite/tests/helpers/auth';
import { visit, currentURL, pauseTest, click, find, findAll, settled} from '@ember/test-helpers';

module('Acceptance | employees', function(hooks) {
  setupApplicationTest(hooks);

  test('getting to the employees',async function(assert){
    server.createList('employees', 7);
    await authenticate.call(this, server);
    await visit('/account/dashboard');
    assert.equal(currentURL(), '/account/dashboard');
    await click('.ui.menu.account__navigation > a');
    await click('.account__sidebar > a[href="/account/employees"]');
    assert.equal(currentURL(), '/account/employees');
  });

  test('employees show up',async function(assert){
    server.createList('employees', 7);
    await authenticate.call(this, server);
    await visit('/account/dashboard');
    assert.equal(currentURL(), '/account/dashboard');
    await click('.ui.menu.account__navigation > a');
    await click('.account__sidebar > a[href="/account/employees"]');
    assert.equal(currentURL(), '/account/employees');
    await settled();
    await pauseTest();
    assert.ok(find('.introjs-tooltip.introjs-top-left-aligned'));
  });
});
