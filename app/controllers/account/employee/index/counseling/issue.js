import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as controller } from '@ember/controller';
import del from 'granite/mixins/controller-abstractions/delete';

export default Controller.extend(del, {
  application:           controller(),
  transitionWithModel:   false,
  transitionAfterDelete: 'account.employee.index.counseling',

  onCorrectiveActionSubroute: computed.match('application.currentPath', /corrective-action/)
});
