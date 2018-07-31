import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | account/employee/index/edit/settings', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:account/employee/index/edit/settings');
    assert.ok(route);
  });
});
