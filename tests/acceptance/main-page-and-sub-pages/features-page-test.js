import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | features page', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /features-page', async function(assert) {
    await visit('/features');

    assert.equal(currentURL(), '/features');
  });

});
