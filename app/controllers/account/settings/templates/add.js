import Ember from 'ember';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

const { Controller } = Ember;

export default Controller.extend(addEdit, {
  transitionAfterSave: 'account.settings.templates',
  transitionWithModel: false
});
