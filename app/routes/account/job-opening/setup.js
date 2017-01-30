import Ember from 'ember';
import wizard from 'granite/mixins/wizard/route';

const { Route, A } = Ember;

export default Route.extend(wizard, {
  key: 'setup',
  basePath: 'account.job-opening.setup',
  returnPath: 'account.job-opening.setup-complete',

  steps: A([{
    icon: 'home',
    title: 'Start',
    link: 'index'
  }, {
    icon: 'settings',
    title: 'Settings',
    link: 'settings'
  }, {
    icon: 'help',
    title: 'Screening',
    link: 'screening'
  }, {
    icon: 'announcement',
    title: 'Sources',
    link: 'sources'
  }, {
    icon: 'pie chart',
    title: 'EEO',
    link: 'eeo'
  }, {
    icon: 'flag checkered',
    title: 'Finish',
    link: 'finish'
  }]),

  actions: {
    startSetup () {
      this.get('controller').set('model.offboarding', true);
      this.send('saveAndContinue');
    }
  }
});
