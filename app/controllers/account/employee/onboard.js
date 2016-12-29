import Ember from 'ember';
import wizard from 'granite/mixins/wizard-base';

const { Controller, A } = Ember;

export default Controller.extend(wizard, {
  steps: A([{
    icon: 'home',
    title: 'Personal',
    link: 'index'
  }, {
    icon: 'travel',
    title: 'Job',
    link: 'job-information'
  }, {
    icon: 'mobile',
    title: 'Assets',
    link: 'equipment'
  }, {
    icon: 'photo',
    title: 'Picture',
    link: 'picture'
  }, {
    icon: 'keyboard',
    title: 'Custom Info',
    link: 'custom-fields'
  }])
});
