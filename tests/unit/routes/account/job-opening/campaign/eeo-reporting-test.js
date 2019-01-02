import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | account/job-opening/campaign/eeo-reporting', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:account/job-opening/campaign/eeo-reporting');
    assert.ok(route);
  });
});
