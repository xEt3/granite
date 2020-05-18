import { module, test } from 'qunit';
import { visit, currentURL, click, find, fillIn, settled } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | login behaviors', function (hooks) {
  setupApplicationTest(hooks);

  test('failed logins', async function (assert) {
    await visit('/');
    assert.equal(currentURL(), '/', 'on page index');
    await click('a[href="/login"]');
    assert.equal(currentURL(), '/login', 'on page login');
    assert.ok(find('input[type="email"]'), 'Email input on page');
    assert.ok(find('input[type="password"]'), 'Password input on page');
    assert.ok(find('button[type="submit"]'), 'Submit button on page');
    await fillIn('input[type="email"]', 'testuser@test.com');
    await fillIn('input[type="password"]', '1234');
    await click('button[type="submit"]');
    const controller = this.owner.lookup('controller:login');
    assert.equal(controller.data.statuses.working.error.message, 'User not found', 'error message is "User not found"');
    assert.equal(currentURL(), '/login', 'Still on login page');
    await settled();
  });

  test('correct login', async function (assert) {
    let companyUser = await server.create('companyUser');

    await visit('/login');
    assert.equal(currentURL(), '/login', 'Current url is login');

    await fillIn('input[type="email"]', companyUser.email);
    await fillIn('input[type="password"]', companyUser.password);
    await click('button[type="submit"]');
    await settled();

    assert.equal(currentURL(), '/account/dashboard', 'Current url is account');
  });
});
