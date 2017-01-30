import Ember from 'ember';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';
import del from 'granite/mixins/controller-abstractions/delete';

const { Controller, inject: { service } } = Ember;

export default Controller.extend(addEdit, del, {
  auth: service(),
  transitionAfterDelete: 'account.recruiting.index.index',
  transitionWithModel: false
});
