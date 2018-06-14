import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | account/visited-first-steps', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:account/visited-first-steps');
    assert.ok(route);
  });
});
