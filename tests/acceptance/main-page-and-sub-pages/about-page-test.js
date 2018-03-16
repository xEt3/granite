import { module, test } from 'qunit';
import { visit, currentURL,click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | about page', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting about', async function(assert) {
    await visit('/about');

    assert.equal(currentURL(), '/about');
  });

  test('About button is visable and link works', async function(assert) {
    await visit('/about');

    assert.ok('.about-link', 'link is there');
    await click('.about-link');
    assert.equal(currentURL(), '/about', 'About page loaded');
  });

  test('Pricing button is visable and link works', async function(assert) {
    await visit('/about');

    assert.ok('.pricing-link', 'link is there');
    await click('.pricing-link');
    assert.equal(currentURL(), '/pricing', 'Pricing page loaded');
  });

  test('Features button is visable and link works', async function(assert) {
    await visit('/about');

    assert.ok('.features-link', 'link is there');
    await click('.features-link');
    assert.equal(currentURL(), '/features', 'Features page loaded');
  });

  test('Contact button is visable and link works', async function(assert) {
    await visit('/about');

    assert.ok('.contact-link', 'link is there');
    await click('.contact-link');
    assert.equal(currentURL(), '/contact', 'Contact page loaded');
  });

  test('Logo button is visable and link works', async function(assert) {
    await visit('/about');

    assert.ok('.logo-link', 'link is there');
    await click('.logo-link');
    assert.equal(currentURL(), '/', 'Main page loaded');
  });

  test('Log in button is visable and link works', async function(assert) {
    await visit('/about');

    assert.ok('.login-link', 'link is there');
    await click('.login-link');
    assert.equal(currentURL(), '/login', 'Log in page loaded');
  });

  test('Signup button is visable and link works', async function(assert) {
    await visit('/about');

    assert.ok('.signup-link', 'link is there');
    await click('.signup-link');
    assert.equal(currentURL(), '/signup', 'Sign Up page loaded');
  });


});
