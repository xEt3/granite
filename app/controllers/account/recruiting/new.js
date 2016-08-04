import Ember from 'ember';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

const { Controller } = Ember;

export default Controller.extend(addEdit, {
  transitionWithModel: true,
  transitionAfterSave: 'account.recruiting.job-description.settings'
});