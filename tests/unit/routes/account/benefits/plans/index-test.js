import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | account/benefits/plans/index', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:account/benefits/plans/index');
    assert.ok(route);
  });
});
