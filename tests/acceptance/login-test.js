import { module, test } from 'qunit';
import { visit, currentURL, click, find, fillIn, settled } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | login behaviors', function(hooks) {
  setupApplicationTest(hooks);

  test('correct login', async function(assert) {
    let companyUser = await server.create('companyUser');
    console.log('created companyUser:', companyUser);
    await visit('/login');
    assert.equal(currentURL(), '/login', 'Current url is login');

    await fillIn('input[type="email"]', companyUser.email);
    await fillIn('input[type="password"]', companyUser.password);
    await click('button[type="submit"]');

    await settled();

    assert.equal(currentURL(), '/account/dashboard', 'Current url is account');
  });

  test('failed logins', async function(assert) {
    assert.expect(8);
    await visit('/');
    assert.equal(currentURL(), '/');

    await click('a[href="/login"]');
    assert.equal(currentURL(), '/login');
    assert.ok(find('input[type="email"]'), 'Email input on page');
    assert.ok(find('input[type="password"]'), 'Password input on page');
    assert.ok(find('button[type="submit"]'), 'Submit button on page');

    await fillIn('input[type="email"]', 'testuser@test.com');
    await fillIn('input[type="password"]', '1234');
    click('button[type="submit"]');

    let done = assert.async();

    setTimeout(() => {
      let $error = find('[class*="c-notification__container"] > [class*="c-notification--error"] > [class*="c-notification__content"]');
      assert.ok($error, 'Error shows');
      assert.ok($error.textContent.trim().toLowerCase().indexOf('user not found') > -1, $error.textContent.trim() + ' Contains "user not found"');
      done();
    }, 1500);

    assert.equal(currentURL(), '/login');
    await settled();
  });


});
