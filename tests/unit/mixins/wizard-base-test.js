import Ember from 'ember';
import WizardBaseMixin from 'granite/mixins/wizard-base';
import { module, test } from 'qunit';

module('Unit | Mixin | wizard base');

// Replace this with your real tests.
test('it works', function(assert) {
  let WizardBaseObject = Ember.Object.extend(WizardBaseMixin);
  let subject = WizardBaseObject.create();
  assert.ok(subject);
});
