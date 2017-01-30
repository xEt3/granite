import { moduleForModel, test } from 'ember-qunit';

moduleForModel('form-element', 'Unit | Serializer | form element', {
  // Specify the other units that are required for this test.
  needs: ['serializer:form-element']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
