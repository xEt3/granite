import Ember from 'ember';

const { Mixin, computed, inject: { controller } } = Ember;

export default Mixin.create({
  application: controller(),
  // steps: computed.reads('target.steps'),
  // basePath: computed.reads('target.basePath'),

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
