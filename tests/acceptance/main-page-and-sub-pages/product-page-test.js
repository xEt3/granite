import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | our product page', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /our-product', async function(assert) {
    await visit('/our-product');
    console.log('after??');
    assert.equal(currentURL(), '/our-product');
    assert.dom('h1.product-section__content--granite').hasText('Granite HR');
  });
});
