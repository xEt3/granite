import { GraniteWizardRoute } from 'granite/core/wizard';
import { A } from '@ember/array';
import { action } from '@ember/object';

const offboardProps = [
  'offboarding',
  'offboardingStep',
  'offboarder',
  'offboardingProgress',
  'terminationDate',
  'terminationReason',
  'eligibleForRehire',
  'finalAddress',
  'finalAddressSelfService'
];

export default class AccountEmployeeOffboardRoute extends GraniteWizardRoute {
  key =        'offboarding'
  basePath =   'account.employee.offboard'
  returnPath = 'account.employee.complete-offboarding'
  setUserOn =  'offboarder'

  steps = A([{
    icon:  'info',
    title: 'Start',
    link:  'index'
  }, {
    icon:  'list',
    title: 'Details',
    link:  'details'
  }, {
    icon:  'options',
    title: 'Options',
    link:  'options'
  }, {
    icon:  'mobile',
    title: 'Assets',
    link:  'assets'
  }, {
    icon:  'file',
    title: 'Documents',
    link:  'documents'
  }, {
    icon:  'cubes',
    title: 'Reorganization',
    link:  'reorganization'
  }])

  @action
  async cancelOffboard () {
    const model = this.controller.model;

    if (!model) {
      return;
    }

    offboardProps.map(prop => model.set(prop, undefined));

    this.analytics.trackEvent('Employees', 'offboarding_canceled', 'Canceled Offboarding');

    await model.save();
    this.transitionTo('account.employee.index.index');
  }

  @action
  startOffboarding () {
    this.analytics.trackEvent('Employees', 'offboarding_started', 'Started Offboarding');
    this.controller.model.offboarding = true;
    this.send('saveAndContinue');
  }
}
