import { module, test } from 'qunit';
import { visit, currentURL, click, find} from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | Main page', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting home page', async function(assert) {
    await visit('/');
    assert.equal(currentURL(), '/');
  });

  test('All necessary links exist', async function(assert) {
    await visit('/');
    assert.ok(find('a[href="/about"]'), 'About link shown on page');
    assert.ok(find('a[href="/pricing"]'), 'Pricing link shown on page');
    assert.ok(find('a[href="/our-product"]'), 'Product link shown on page');
    assert.ok(find('a[href="/contact"]'), 'Contact link shown on page');
    assert.ok(find('a[href="/login"]'), 'Log In link shown on page');
    assert.ok(find('a[href="/signup"]'), 'Sign Up link shown on page');
    assert.ok(find('.logo-text'), 'Logo link shown on page');
  });

  test('Explore Granite button is visible and link works', async function(assert) {
    await visit('/');
    assert.ok(find('.explore-link'), 'link is there');
    await click('.explore-link');
    assert.equal(currentURL(), '/our-product', 'Product page loaded');
  });

  test('5 Minute Sign Up button is visable and link works', async function(assert) {
    await visit('/');
    assert.ok(find('.five-min-set-link'), 'link is there');
    await click('.five-min-set-link');
    assert.equal(currentURL(), '/signup', 'Sign Up page loaded');
  });

  test('page not found', async function(assert) {
    await visit('/not_found');
    assert.ok(find('a[href="/"]'), 'back to link shown on page');
    assert.equal(currentURL(), '/not_found', 'page not found');
  });
});
