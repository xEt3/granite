import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | account/settings/billing/index', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:account/settings/billing/index');
    assert.ok(route);
  });
});
