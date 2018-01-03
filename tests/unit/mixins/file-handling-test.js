import Ember from 'ember';
import FileHandlingMixin from 'granite/mixins/file-handling';
import { module, test } from 'qunit';

module('Unit | Mixin | file handling');

// Replace this with your real tests.
test('it works', function(assert) {
  let FileHandlingObject = Ember.Object.extend(FileHandlingMixin);
  let subject = FileHandlingObject.create();
  assert.ok(subject);
});
