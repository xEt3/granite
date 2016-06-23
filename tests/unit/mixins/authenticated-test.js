import Ember from 'ember';
import AuthenticatedMixin from 'granite/mixins/authenticated';
import { module, test } from 'qunit';

module('Unit | Mixin | authenticated');

// Replace this with your real tests.
test('it works', function(assert) {
  let AuthenticatedObject = Ember.Object.extend(AuthenticatedMixin);
  let subject = AuthenticatedObject.create();
  assert.ok(subject);
});
