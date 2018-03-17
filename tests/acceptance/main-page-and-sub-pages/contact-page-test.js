import { module, test } from 'qunit';
import { visit, currentURL, click, find } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | contact page', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /features-page', async function(assert) {
    await visit('/contact');

    assert.equal(currentURL(), '/contact');
  });

  test('Contact Phone number is there and link works', async function(assert) {
    await visit('/contact');
    //will get the phone number link length
    var phoneLinkStringLength = document.links.namedItem("phone").href.length;
    //gets just the sting for the phone number link in contact.hbs
    var phoneLinkString = document.links.namedItem("phone").href;
    //grabs just the numbers
    var numberRegex = /[0-9]/g;
    // usees regex to fiter just number out of the phoneLinkString
    var phoneLength=phoneLinkString.match(numberRegex).length;
    assert.ok(find('a[href="tel:4062486178"]'), 'Phone link shown on page');
    assert.equal(10,phoneLength,'there are '+phoneLength+' numbers in the phone number');
    assert.equal(14,phoneLinkStringLength, 'the phone links shows ' +phoneLinkString+ ' equaling 14 chars');
  });

  test('Contact Email is there and link works', async function(assert) {
    await visit('/contact');

    assert.ok(find('a[href="mailto:hello@granitehr.com"]'), 'Email link shown on page');
    //await click('.signup-link');
    //assert.equal(currentURL(), '/signup', 'Sign Up page loaded');
  });

  test('Contact Social media is there and link works', async function(assert) {
    await visit('/contact');

    assert.ok(find('a[href="http://twitter.com/user/granitehr"]'), 'Twitter link shown on page');
    //await click('.twitter-link');
    //assert.equal(currentURL(), 'https://twitter.com/user/lists/granitehr','Loads Twitter page' );
    //assert.ok(find('.facebook-link'), 'Facebook link is there');
    //await click('.facebook-link');
    assert.ok(find('a[href="http://facebook.com/granitehr"]'), 'Facebook link shown on page');
    //assert.ok(find('.linkedin-link'), 'linkedin link is there');
    //await click('.linkedin-link');
    assert.ok(find('a[href="http://linkedin.com/granitehr"]'), 'Linkedin link shown on page');

    //await click('.signup-link');
    //assert.equal(currentURL(), '/signup', 'Sign Up page loaded');
  });




});
