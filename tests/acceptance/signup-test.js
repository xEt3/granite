import { test } from 'qunit';
import moduleForAcceptance from 'granite/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | signup');

test('completed signup redirects to billing', function(assert) {
  visit('/signup');
  fillIn('input[id="company-name"]', 'Awesome Widgets Unincorporated');
  fillIn('input[id="first-name"]', 'Serious');
  fillIn('input[id="last-name"]', 'Sam');
  fillIn('input[id="company-email"]', 'SeriousSam@yahoo.com');
  fillIn('input[id="street-address"]', '1212 Somber Street');
  fillIn('input[id="city"]', 'Billings');
  // TODO: state options
  fillIn('input[id="zipcode"]', '59102');
  click('button[type="submit"]');

  andThen(function() {
    assert.equal(currentURL(), '/signup/billing');
  });
});
