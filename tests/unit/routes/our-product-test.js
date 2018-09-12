import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | our-product', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:our-product');
    assert.ok(route);
  });
});
