import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import { inject as controller } from '@ember/controller';

export default Mixin.create({
  application: controller(),
  // steps: computed.reads('target.steps'),
  // basePath: computed.reads('target.basePath'),

  currentStep: computed('steps.@each.link', 'application.currentPath', function () {
    const steps = this.steps,
          pathSegment = this.get('application.currentPath').split('.').pop();

    return steps.find(step => pathSegment.indexOf(step.link) > -1);
  }),

  currentStepIndex: computed('currentStep', 'steps', function () {
    return this.steps.indexOf(this.currentStep) + 1;
  }),

  nextStep: computed('steps', 'currentStepIndex', function () {
    return this.steps.objectAt(this.currentStepIndex);
  }),

  progress: computed('currentStepIndex', 'steps', function () {
    return this.currentStepIndex / this.get('steps.length') * 100;
  })
});
