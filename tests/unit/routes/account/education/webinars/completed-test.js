import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | account/education/webinars/completed', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:account/education/webinars/completed');
    assert.ok(route);
  });
});
