import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | contact page', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /contact-page', async function(assert) {
    await visit('/contact');

    assert.equal(currentURL(), '/contact');
  });
  test('About button is visable and link works', async function(assert) {
    await visit('/contact');

    assert.ok('.about-link', 'link is there');
    await click('.about-link');
    assert.equal(currentURL(), '/about', 'About page loaded');
  });

  test('Pricing button is visable and link works', async function(assert) {
    await visit('/contact');

    assert.ok('.pricing-link', 'link is there');
    await click('.pricing-link');
    assert.equal(currentURL(), '/pricing', 'Pricing page loaded');
  });

  test('Features button is visable and link works', async function(assert) {
    await visit('/contact');

    assert.ok('.features-link', 'link is there');
    await click('.features-link');
    assert.equal(currentURL(), '/features', 'Features page loaded');
  });

  test('Contact button is visable and link works', async function(assert) {
    await visit('/contact');

    assert.ok('.contact-link', 'link is there');
    await click('.contact-link');
    assert.equal(currentURL(), '/contact', 'Contact page loaded');
  });

  test('Logo button is visable and link works', async function(assert) {
    await visit('/contact');

    assert.ok('.logo-link', 'link is there');
    await click('.logo-link');
    assert.equal(currentURL(), '/', 'Main page loaded');
  });

  test('Log in button is visable and link works', async function(assert) {
    await visit('/contact');

    assert.ok('.login-link', 'link is there');
    await click('.login-link');
    assert.equal(currentURL(), '/login', 'Log in page loaded');
  });

  test('Signup button is visable and link works', async function(assert) {
    await visit('/contact');

    assert.ok('.signup-link', 'link is there');
    await click('.signup-link');
    assert.equal(currentURL(), '/signup', 'Sign Up page loaded');
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
    assert.ok('.phone-link', 'link is there');
    assert.equal(10,phoneLength,'there are '+phoneLength+' numbers in the phone number');
    assert.equal(14,phoneLinkStringLength, 'the phone links shows ' +phoneLinkString+ ' equaling 14 chars');
  });

  test('Contact Email is there and link works', async function(assert) {
    await visit('/contact');

    assert.ok('.email-link', 'link is there');
    //await click('.signup-link');
    //assert.equal(currentURL(), '/signup', 'Sign Up page loaded');
  });

  test('Contact Social media is there and link works', async function(assert) {
    await visit('/contact');

    assert.ok('.twitter-link', ' Twitter link is there');
    //await click('.twitter-link');
    assert.equal(currentURL(), 'https://twitter.com/user/lists/granitehr','Loads Twitter page' );
    assert.ok('.facebook-link', 'Facebook link is there');
    //await click('.facebook-link');
    assert.equal(currentURL(), 'https://www.facebook.com/granitehr', 'Loads Facebok page' );
    assert.ok('.linkedin-link', 'linkedin link is there');
    //await click('.linkedin-link');
    assert.equal(currentURL(), 'https://www.linkedin.com/granitehr', 'Loads linkedin page' );

    //await click('.signup-link');
    //assert.equal(currentURL(), '/signup', 'Sign Up page loaded');
  });




});
