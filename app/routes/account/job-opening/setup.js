import { GraniteWizardRoute } from 'granite/core/wizard';
import { action } from '@ember/object';
import { A } from '@ember/array';

export default class AccountJobOpeningSetupRoute extends GraniteWizardRoute {
  titleToken = 'Job Opening'
  key =        'setup'
  basePath =   'account.job-opening.setup'
  returnPath = 'account.job-opening.setup-complete'

  steps = A([{
    icon:  'home',
    title: 'Start',
    link:  'index'
  }, {
    icon:  'settings',
    title: 'Settings',
    link:  'settings'
  }, {
    icon:  'help',
    title: 'Screening',
    link:  'screening'
  }, {
    icon:  'announcement',
    title: 'Sources',
    link:  'sources'
  }, {
    icon:  'pie chart',
    title: 'EEO',
    link:  'eeo'
  }, {
    icon:  'flag checkered',
    title: 'Finish',
    link:  'finish'
  }])

  @action
  startSetup () {
    // this.get('controller').set('model.offboarding', true); //THIS CANNOT BE THE RIGHT PROPERTY, RIGHT?
    this.send('saveAndContinue');
  }
}
