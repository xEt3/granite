import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | account/settings/billing/index', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:account/settings/billing/index');
    assert.ok(controller);
  });
});
