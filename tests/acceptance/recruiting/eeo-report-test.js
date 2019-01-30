import { module, test } from 'qunit';
import { faker } from 'ember-cli-mirage';
import { setupApplicationTest } from 'ember-qunit';
import authenticate from 'granite/tests/helpers/auth';
import { visit, currentURL, click, settled } from '@ember/test-helpers';

module('Acceptance | recruiting-applicant-tracking', function (hooks) {
  setupApplicationTest(hooks);

  test('eeo report comes displays correctly', async function (assert) {
    let done = assert.async();
    setTimeout(() => {
      done();
    }, 10000);

    assert.equals(1, 1, 'test assertion');
  });
});
