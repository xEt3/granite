import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

const headings = [
  'Recruiting',
  'Counseling',
  'Asset Management',
  'Human Capital'
];

module('Acceptance | our product page', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /our-product', async function(assert) {
    await visit('/our-product');
    assert.equal(currentURL(), '/our-product');

    // headings are there...
    assert.dom('h1.product-section__content--granite').hasText('Granite HR');

    headings.forEach(heading => {
      let contentSelector = heading.replace(' ', '-').toLowerCase();
      assert.dom(`.product__section--${contentSelector} h1.section-content__title`).hasText(heading);
    });
  });
});
