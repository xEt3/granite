import Ember from 'ember';
import RouteAbstractionsResourceMixin from 'granite/mixins/route-abstractions/resource';
import { module, test } from 'qunit';

module('Unit | Mixin | route abstractions/resource');

// Replace this with your real tests.
test('it works', function(assert) {
  let RouteAbstractionsResourceObject = Ember.Object.extend(RouteAbstractionsResourceMixin);
  let subject = RouteAbstractionsResourceObject.create();
  assert.ok(subject);
});
