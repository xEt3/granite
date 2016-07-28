import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  steps: [{
    icon: 'home',
    title: 'Personal',
    link: 'index'
  }, {
    icon: 'travel',
    title: 'Job',
    link: 'job-information'
  }, {
    icon: 'mobile',
    title: 'Equipment',
    link: 'equipment'
  }]
});
