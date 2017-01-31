import Ember from 'ember';
import del from 'granite/mixins/controller-abstractions/delete';

export default Ember.Controller.extend(del, {
  transitionAfterDelete: 'account.employee.index.counseling.issue'
});
