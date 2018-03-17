import { module, test } from 'qunit';
import { visit, currentURL, click, find, findAll } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | pricing page', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /pricing-page', async function(assert) {
    await visit('/pricing');

    assert.equal(currentURL(), '/pricing');
  });


});
