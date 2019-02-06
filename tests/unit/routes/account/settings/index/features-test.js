import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | account/settings/index/features', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:account/settings/index/features');
    assert.ok(route);
  });
});
