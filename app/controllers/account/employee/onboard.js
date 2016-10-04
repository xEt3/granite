import Ember from 'ember';

const { Controller, A, computed, inject } = Ember;

export default Controller.extend({
  application: inject.controller(),

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
    icon: 'sticky note',
    title: 'Custom Info',
    link: 'custom-fields'
  }]),

  currentStep: computed('steps.@each.link', 'application.currentPath', function () {
    const steps = this.get('steps'),
          pathSegment = this.get('application.currentPath').split('.').pop();

    return steps.find(step => pathSegment.indexOf(step.link) > -1);
  }),

  currentStepIndex: computed('currentStep', 'steps', function () {
    return this.get('steps').indexOf(this.get('currentStep')) + 1;
  }),

  nextStep: computed('steps', 'currentStepIndex', function () {
    return this.get('steps').objectAt(this.get('currentStepIndex'));
  }),

  progress: computed('currentStepIndex', 'steps', function () {
    return this.get('currentStepIndex') / this.get('steps.length') * 100;
  })
});
