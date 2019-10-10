import Route from '@ember/routing/route';
import { A } from '@ember/array';
import wizard from 'granite/mixins/wizard/route';

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

export default Route.extend(wizard, {
  key:        'offboarding',
  basePath:   'account.employee.offboard',
  returnPath: 'account.employee.complete-offboarding',
  setUserOn:  'offboarder',

  steps: A([{
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
  }]),

  actions: {
    cancelOffboard () {
      const model = this.get('controller.model');

      if (!model) {
        return;
      }

      offboardProps.map(prop => model.set(prop, undefined));

      this.analytics.trackEvent('Employees', 'offboarding_canceled', 'Canceled Offboarding');

      model.save()
      .then(() => this.transitionTo('account.employee.index.index'));
    },

    startOffboarding () {
      this.analytics.trackEvent('Employees', 'offboarding_started', 'Started Offboarding');
      this.get('controller').set('model.offboarding', true);
      this.send('saveAndContinue');
    }
  }
});
