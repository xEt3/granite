import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | account/employee/onboard/documents', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:account/employee/onboard/documents');
    assert.ok(route);
  });
});
