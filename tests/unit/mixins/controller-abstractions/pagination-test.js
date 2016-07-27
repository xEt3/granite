import Ember from 'ember';
import ControllerAbstractionsPaginationMixin from 'granite/mixins/controller-abstractions/pagination';
import { module, test } from 'qunit';

module('Unit | Mixin | controller abstractions/pagination');

// Replace this with your real tests.
test('it works', function(assert) {
  let ControllerAbstractionsPaginationObject = Ember.Object.extend(ControllerAbstractionsPaginationMixin);
  let subject = ControllerAbstractionsPaginationObject.create();
  assert.ok(subject);
});
