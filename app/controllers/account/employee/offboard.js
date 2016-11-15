import Ember from 'ember';
import wizard from 'granite/mixins/wizard-base';

const { Controller, A } = Ember;

export default Controller.extend(wizard, {
  steps: A([{
    icon: 'info',
    title: 'Start',
    link: 'index'
  }, {
    icon: 'list',
    title: 'Details',
    link: 'details'
  }, {
    icon: 'options',
    title: 'Options',
    link: 'options'
  }, {
    icon: 'mobile',
    title: 'Assets',
    link: 'assets'
  }, {
    icon: 'cubes',
    title: 'Reorganization',
    link: 'reorganization'
  }])
});
