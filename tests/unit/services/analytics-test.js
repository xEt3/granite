import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | analytics', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists & has methods', function (assert) {
    let service = this.owner.lookup('service:analytics');
    assert.equal(typeof service.identifyUser, 'function', 'analytics#identifyUser presence');
    assert.equal(typeof service.trackEvent, 'function', 'analytics#trackEvent presence');
  });
});
