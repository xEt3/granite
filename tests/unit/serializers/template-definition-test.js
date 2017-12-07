import { moduleForModel, test } from 'ember-qunit';

moduleForModel('template-definition', 'Unit | Serializer | template definition', {
  // Specify the other units that are required for this test.
  needs: ['serializer:template-definition']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
