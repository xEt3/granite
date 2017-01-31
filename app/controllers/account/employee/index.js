import Ember from 'ember';
import del from 'granite/mixins/controller-abstractions/delete';

const { Controller, computed, inject: { controller } } = Ember;

export default Controller.extend(del, {
  application: controller(),
  transitionAfterSave: 'account.employees',

  onSummary: computed.equal('application.currentPath', 'account.employee.index.index')
});
