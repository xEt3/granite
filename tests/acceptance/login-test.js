import { test } from 'qunit';
import moduleForAcceptance from 'granite/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | login behaviors');

test('failed logins', function(assert) {
  assert.expect(8);
  visit('/');

  andThen(() => {
    assert.equal(currentURL(), '/');
    click('a[href="/login"]');
  });

  andThen(() => {
    assert.equal(currentURL(), '/login');
    assert.ok(find('input[type="email"]')[0], 'Email input on page');
    assert.ok(find('input[type="password"]')[0], 'Password input on page');
    assert.ok(find('button[type="submit"]')[0], 'Submit button on page');

    fillIn('input[type="email"]', 'testuser@test.com');
    fillIn('input[type="password"]', '1234');
    click('button[type="submit"]');

    let done = assert.async();

    setTimeout(() => {
      let $error = find('.c-notification__container > .c-notification--error > .c-notification__content');
      assert.ok($error[0], 'Error shows');
      assert.ok($error.text().toLowerCase().indexOf('user not found') > -1, 'Contains "user not found"');
      done();
    }, 500);
  });

  andThen(() => {
    assert.equal(currentURL(), '/login');
  });
});

test('correct login', function(assert) {
  visit('/login');
  percySnapshot('login');

  andThen(() => {
    assert.equal(currentURL(), '/login', 'Current url is login');
    fillIn('input[type="email"]', 'user@test.com');
    fillIn('input[type="password"]', '1234');
    click('button[type="submit"]');
  });

  andThen(() => {
    assert.equal(currentURL(), '/account/dashboard', 'Current url is account');
  });
});
