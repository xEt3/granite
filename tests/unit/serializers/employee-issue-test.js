import { moduleForModel, test } from 'ember-qunit';

moduleForModel('employee-issue', 'Unit | Serializer | employee issue', {
  // Specify the other units that are required for this test.
  needs: ['serializer:employee-issue']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
