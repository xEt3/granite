import BaseLiComponent from '../base';
import { computed } from '@ember/object';

const ACTIONS = {
  EMPLOYEE_ONBOARDING:  'account.employee.onboard',
  EMPLOYEE_OFFBOARDING: 'account.employee.offboard',
  JOBOPENING_ATS:       'account.job-opening.campaign.applicant-tracking',
  JOBOPENING_SETUP:     'account.job-opening.setup'
};

export default BaseLiComponent.extend({
  classNames: [ 'item' ],

  link: computed('model.continuationAction', function () {
    return ACTIONS[this.get('model.continuationAction')];
  })
});
