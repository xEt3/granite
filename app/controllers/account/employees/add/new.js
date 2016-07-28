import Ember from 'ember';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';
import { suffixes } from 'granite/config/statics';

const { Controller } = Ember;


export default Controller.extend(addEdit, {
  suffixes,
  transitionAfterSave: 'account.employee.onboard.index',
  transitionWithModel: true
});
