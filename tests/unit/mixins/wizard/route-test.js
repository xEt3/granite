import Ember from 'ember';
import WizardRouteMixin from 'granite/mixins/wizard/route';
import { module, test } from 'qunit';

module('Unit | Mixin | wizard/route');

// Replace this with your real tests.
test('it works', function(assert) {
  let WizardRouteObject = Ember.Object.extend(WizardRouteMixin);
  let subject = WizardRouteObject.create();
  assert.ok(subject);
});
