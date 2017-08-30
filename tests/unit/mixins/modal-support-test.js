import Ember from 'ember';
import ModalSupportMixin from 'granite/mixins/modal-support';
import { module, test } from 'qunit';

module('Unit | Mixin | modal support');

// Replace this with your real tests.
test('it works', function(assert) {
  let ModalSupportObject = Ember.Object.extend(ModalSupportMixin);
  let subject = ModalSupportObject.create();
  assert.ok(subject);
});
