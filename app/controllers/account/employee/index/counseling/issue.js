import Ember from 'ember';
import del from 'granite/mixins/controller-abstractions/delete';

const { Controller } = Ember;

export default Controller.extend(del, {
  transitionWithModel: false,
  transitionAfterDelete: 'account.employee.index.counseling'
});
