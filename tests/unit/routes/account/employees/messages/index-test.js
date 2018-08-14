import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | account/employees/messages/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:account/employees/messages/index');
    assert.ok(route);
  });
});
