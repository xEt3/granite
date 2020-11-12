import { GraniteWizardRoute } from 'granite/core/wizard';
import { A } from '@ember/array';

export default class AccountEmployeeOnboardRoute extends GraniteWizardRoute {
  key        = 'onboarding'
  basePath   = 'account.employee.onboard'
  returnPath = 'account.employee.onboard-complete'
  setUserOn  = 'onboarder'

  steps = A([{
    icon:  'home',
    title: 'Personal',
    link:  'index'
  }, {
    icon:  'travel',
    title: 'Job',
    link:  'job-information'
  }, {
    icon:  'mobile',
    title: 'Assets',
    link:  'equipment'
  }, {
    icon:  'file',
    title: 'Documents',
    link:  'documents'
  }, {
    icon:  'photo',
    title: 'Picture',
    link:  'picture'
  }, {
    icon:  'keyboard',
    title: 'Custom Info',
    link:  'custom-fields'
  }])

  afterSaveAndContinue (model) {
    model.bankAccounts.filterBy('id', null).invoke('destroyRecord');
  }
}
