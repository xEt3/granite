import GraniteRoute from './route';
import GraniteController from './controller';
import { action, get } from '@ember/object';
import { inject as service } from '@ember/service';
import { scheduleOnce } from '@ember/runloop';

class GraniteWizardRoute extends GraniteRoute {
  @service data
  /*
    The key of properties set on the model (ex. for offboarding 'offboarding')
    This will set offboarding, offboardingStep, and offboardingProgress on the
    current model.
   */
  key = null
  /*
    The route path of where the wizard is located. If your wizard is at
    "account.employee.setup", this should be the base path
   */
  basePath = null
  /*
    Where the user will be returned to if no more steps exist.
   */
  returnPath = null
  /*
    If this property is set, we will set the property here on the model as the
    current user in "auth".
    ex. setUserOn = 'offboarder', every step we will make sure the current
    user is set on model.offboarder
   */
  setUserOn = null

  setupController (controller, model) {
    controller.setProperties({
      steps:    this.steps,
      basePath: this.basePath
    });

    super.setupController(...arguments);

    const step = model.get(`${this.key}Step`),
          steps = this.steps,
          basePath = this.basePath;

    if (step > 0) {
      scheduleOnce('afterRender', () => {
        if (this.controller.currentStepIndex === 1) {
          let l = get(steps.objectAt(step), 'link');
          this.transitionTo(`${basePath}.${l}`);
        }
      });
    }
  }

  @action
  async saveAndContinue () {
    const { success, error } = this.data.createStatus('wizard');

    const { controller, setUserOn, key } = this,
          { model, currentStepIndex, progress } = controller;

    let morph = {};

    morph[key] = true;
    morph[key + 'Step'] = currentStepIndex;
    morph[key + 'Progress'] = parseInt(progress, 0);

    if (setUserOn) {
      morph[setUserOn] = this.get('auth.user');
    }

    model.setProperties(morph);

    try {
      await model.save();

      if (this.afterSaveAndContinue) {
        await this.afterSaveAndContinue(model);
      }
      success('Successfully saved progress.');

      if (!controller.nextStep) {
        this.transitionTo(this.returnPath);
        return;
      }
    } catch (e) {
      error(e);
      return;
    }

    this.transitionTo(`${this.basePath}.${controller.get('nextStep.link')}`);
  }
}

class GraniteWizardController extends GraniteController {
  @service router

  get currentStep () {
    const steps = this.steps,
          pathSegment = this.router.currentRouteName.split('.').pop();

    return steps.find(step => pathSegment.indexOf(step.link) > -1);
  }

  get currentStepIndex () {
    return this.steps.indexOf(this.currentStep) + 1;
  }

  get nextStep () {
    return this.steps.objectAt(this.currentStepIndex);
  }

  get progress () {
    return this.currentStepIndex / this.steps.length * 100;
  }
}

export {
  GraniteWizardRoute,
  GraniteWizardController
};
