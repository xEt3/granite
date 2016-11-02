import { test } from 'qunit';
import moduleForAcceptance from 'granite/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | Main page');

test('should display basic functions', function(assert) {
  visit('/');
  percySnapshot('index');

  andThen(function() {
    assert.ok(find('nav.nav__main')[0], 'Navbar on page');
    assert.ok(find('a[href="/signup"]')[0], 'Signup link shown on page');
  });
});
