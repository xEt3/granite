import { test } from 'qunit';
import moduleForAcceptance from 'granite/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | Main nav');

test('should show on /', function(assert) {
  visit('/');

  andThen(function() {
    assert.ok(find('nav.nav__main')[0]);
  });
});

test('should hide on /account', function(assert) {
  visit('/account');

  andThen(function() {
    assert.ok(find('nav.nav__main').length < 1);
  });
});
