import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | education/webinars', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /education/webinars', async function(assert) {
    await visit('/education/webinars');

    assert.equal(currentURL(), '/education/webinars');
  });
});
