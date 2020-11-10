import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { run } from '@ember/runloop';
import moment from 'moment';

module('Unit | Serializer | open enrollment', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let store = this.owner.lookup('service:store');
    let serializer = store.serializerFor('open-enrollment');

    assert.ok(serializer);
  });

  test('it serializes records', function (assert) {
    let store = this.owner.lookup('service:store');

    let record = run(() => store.createRecord('open-enrollment', {
      start: moment().toDate(),
      end:   moment().add(2, 'day').toDate()
    }));

    let serializedRecord = record.serialize();

    assert.ok(serializedRecord);

    [ 'start', 'end' ].forEach(time => {
      assert.equal(serializedRecord[time].month, moment(record[time]).format('M'), `${time} month has the correct number`);
      assert.equal(serializedRecord[time].day, moment(record[time]).format('D'), `${time} day has the correct number`);
    });
  });
});
