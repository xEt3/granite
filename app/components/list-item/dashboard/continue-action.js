import classic from 'ember-classic-decorator';
import { classNames } from '@ember-decorators/component';
import { computed } from '@ember/object';
import BaseLiComponent from '../base';

const ACTIONS = {
  EMPLOYEE_ONBOARDING:  'account.employee.onboard',
  EMPLOYEE_OFFBOARDING: 'account.employee.offboard',
  JOBOPENING_ATS:       'account.job-opening.campaign.applicant-tracking',
  JOBOPENING_SETUP:     'account.job-opening.setup'
};

@classic
@classNames('item')
export default class ContinueAction extends BaseLiComponent {
  @computed('model.continuationAction')
  get link() {
    return ACTIONS[this.get('model.continuationAction')];
  }
}
