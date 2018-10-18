import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | search/quick results', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /search/quick-results', async function(assert) {
    await visit('/search/quick-results');

    assert.equal(currentURL(), '/search/quick-results');
  });
});
