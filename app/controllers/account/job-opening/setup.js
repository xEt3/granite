import Ember from 'ember';
import wizard from 'granite/mixins/wizard-base';

const { Controller, A } = Ember;

export default Controller.extend(wizard, {
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
  }])
});
