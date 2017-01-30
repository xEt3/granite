import Ember from 'ember';
import del from 'granite/mixins/controller-abstractions/delete';

const { Controller, computed, inject: { controller } } = Ember;

export default Controller.extend(del, {
  application: controller(),
  transitionWithModel: false,
  transitionAfterDelete: 'account.employee.index.counseling',

  onCorrectiveActionSubroute: computed.match('application.currentPath', /corrective-action/)
});
