import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | account/anatomy/location/edit', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:account/anatomy/location/edit');
    assert.ok(route);
  });
});
