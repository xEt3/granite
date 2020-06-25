import { module, test } from 'qunit';
import { visit, currentURL, click, findAll, fillIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import authenticate from 'granite/tests/helpers/auth';

module('Acceptance | settings/user', function (hooks) {
  setupApplicationTest(hooks);

  test('changing password', async function (assert) {
    await authenticate.call(this, server);

    await visit('/account/settings/user');
    assert.equal(currentURL(), '/account/settings/user');

    let passwordInputs = await findAll('.field > input');

    assert.equal(passwordInputs.length, 3);
    await fillIn(passwordInputs[0], 'test');
    await fillIn(passwordInputs[1], '123');
    await fillIn(passwordInputs[2], '123');
    await click('.yellow.button');

    const controller = this.owner.lookup('controller:account/settings/user');
    assert.equal(controller.data.statuses.working.message, 'Successfully changed.', 'success message is "Successfully changed."');
  });

  test('changing password with non matching passwords', async function (assert) {
    await authenticate.call(this, server);

    await visit('/account/settings/user');
    assert.equal(currentURL(), '/account/settings/user');
    let passwordInputs = await findAll('.field > input');

    assert.equal(passwordInputs.length, 3);
    await fillIn(passwordInputs[0], 'test');
    await fillIn(passwordInputs[1], '124');
    await fillIn(passwordInputs[2], '123');
    await click('.yellow.button');

    const controller = this.owner.lookup('controller:account/settings/user');
    assert.equal(controller.data.statuses.working.error.message, 'Passwords do not match.', 'error message is "Passwords do not match."');
  });
});
