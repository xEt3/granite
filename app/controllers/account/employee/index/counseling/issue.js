import Controller from 'granite/core/controller';
import { computed } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as controller } from '@ember/controller';
import { inject as service } from '@ember/service';

export default class AccountEmployeeCounselingIssueController extends Controller {
  @controller application
  @service data

  @tracked correctiveActions

  deleteOptions = {
    transitionWithModel:   false,
    transitionAfterDelete: 'account.employee.index.counseling'
  }

  @computed.match('application.currentPath', /corrective-action/) onCorrectiveActionSubroute
}
