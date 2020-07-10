import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | account/benefits/plans', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:account/benefits/plans');
    assert.ok(route);
  });
});
