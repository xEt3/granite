import Ember from 'ember';
import WizardControllerMixin from 'granite/mixins/wizard/controller';
import { module, test } from 'qunit';

module('Unit | Mixin | wizard/controller');

// Replace this with your real tests.
test('it works', function(assert) {
  let WizardControllerObject = Ember.Object.extend(WizardControllerMixin);
  let subject = WizardControllerObject.create();
  assert.ok(subject);
});
