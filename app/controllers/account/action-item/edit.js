import Ember from 'ember';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

const { Controller } = Ember;

export default Controller.extend(addEdit, {
  transitionAfterSave: 'account.action-item.index',
  transitionWithModel: true,
  modelIdentifier: 'slug',

  actions: {
    updatePriority ( newValue ) {
      this.set('model.priority', newValue[0]);
    }
  }
});
