import Ember from 'ember';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

export default Ember.Controller.extend(addEdit, {
  transitionAfterSave: 'account.asset',
  transitionWithModel: false,

  afterSave () {
    this.send('refresh');
  }
});
