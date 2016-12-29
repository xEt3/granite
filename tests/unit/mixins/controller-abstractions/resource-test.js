import Ember from 'ember';
import ControllerAbstractionsResourceMixin from 'granite/mixins/controller-abstractions/resource';
import { module, test } from 'qunit';

module('Unit | Mixin | controller abstractions/resource');

// Replace this with your real tests.
test('it works', function(assert) {
  let ControllerAbstractionsResourceObject = Ember.Object.extend(ControllerAbstractionsResourceMixin);
  let subject = ControllerAbstractionsResourceObject.create();
  assert.ok(subject);
});
