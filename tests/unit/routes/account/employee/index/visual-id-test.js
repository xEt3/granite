import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | account/employee/index/visual-id', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:account/employee/index/visual-id');
    assert.ok(route);
  });
});
