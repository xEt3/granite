import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | account/education/webinars/purchase', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:account/education/webinars/purchase');
    assert.ok(route);
  });
});
