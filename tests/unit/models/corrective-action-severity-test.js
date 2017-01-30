import { moduleForModel, test } from 'ember-qunit';

moduleForModel('corrective-action-severity', 'Unit | Model | corrective action severity', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
