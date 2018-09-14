import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | account/settings/billing/invoice', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:account/settings/billing/invoice');
    assert.ok(route);
  });
});
