import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | Main page', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting home page', async function(assert) {
    await visit('/');

    assert.equal(currentURL(), '/');
  });

  test('About button is visable and link works', async function(assert) {
    await visit('/');

    assert.ok('.about-link', 'link is there');
    await click('.about-link');
    assert.equal(currentURL(), '/about', 'About page loaded');
  });

  test('Pricing button is visable and link works', async function(assert) {
    await visit('/');

    assert.ok('.pricing-link', 'link is there');
    await click('.pricing-link');
    assert.equal(currentURL(), '/pricing', 'Pricing page loaded');
  });

  test('Features button is visable and link works', async function(assert) {
    await visit('/');

    assert.ok('.features-link', 'link is there');
    await click('.features-link');
    assert.equal(currentURL(), '/features', 'Features page loaded');
  });

  test('Contact button is visable and link works', async function(assert) {
    await visit('/');

    assert.ok('.contact-link', 'link is there');
    await click('.contact-link');
    assert.equal(currentURL(), '/contact', 'Contact page loaded');
  });

  test('Logo button is visable and link works', async function(assert) {
    await visit('/');

    assert.ok('.logo-link', 'link is there');
    await click('.logo-link');
    assert.equal(currentURL(), '/', 'Main page loaded');
  });

  test('Log in button is visable and link works', async function(assert) {
    await visit('/');

    assert.ok('.login-link', 'link is there');
    await click('.login-link');
    assert.equal(currentURL(), '/login', 'Log in page loaded');
  });

  test('Signup button is visable and link works', async function(assert) {
    await visit('/');

    assert.ok('.signup-link', 'link is there');
    await click('.signup-link');
    assert.equal(currentURL(), '/signup', 'Sign Up page loaded');
  });

  test('Explore Granite button is visable and link works', async function(assert) {
    await visit('/');

    assert.ok('.explore-link', 'link is there');
    await click('.explore-link');
    assert.equal(currentURL(), '/signup', 'Sign Up page loaded');
  });

  test('5 Minute Sign Up button is visable and link works', async function(assert) {
    await visit('/');

    assert.ok('.five-min-set-link', 'link is there');
    await click('.five-min-set-link');
    assert.equal(currentURL(), '/signup', 'Sign Up page loaded');
  });

  test('Navigation bar is on the page', function(assert) {
    visit('/');

      assert.ok('nav.nav__main', 'Navbar on page');

    });

   test('page not found', async function(assert) {
      await visit('/not_found');
      assert.ok('.landing-img wilso')
      assert.equal(currentURL(), '/not_found', 'page not found');
    });

});
