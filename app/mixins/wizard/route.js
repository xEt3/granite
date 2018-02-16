import Mixin from '@ember/object/mixin';
import { get } from '@ember/object';
import { run } from '@ember/runloop';
import { inject as service } from '@ember/service';
import ajaxStatus from '../ajax-status';

export default Mixin.create(ajaxStatus, {
  auth: service(),
  /*
    The key of properties set on the model (ex. for offboarding 'offboarding')
    This will set offboarding, offboardingStep, and offboardingProgress on the
    current model.
   */
  key: null,
  /*
    The route path of where the wizard is located. If your wizard is at
    "account.employee.setup", this should be the base path
   */
  basePath: null,
  /*
    Where the user will be returned to if no more steps exist.
   */
  returnPath: null,
  /*
    If this property is set, we will set the property here on the model as the
    current user in "auth".
    ex. setUserOn = 'offboarder', every step we will make sure the current
    user is set on model.offboarder
   */
  setUserOn: null,

  afterModel (model) {
    this._super(...arguments);

    let step = model.get(`${this.get('key')}Step`),
        steps = this.get('steps'),
        basePath = this.get('basePath');

    if ( step && step > 1 ) {
      run.scheduleOnce('afterRender', () => {
        if (this.get('controller.currentStepIndex') === 1) {
          let l = get(steps.objectAt(step), 'link');
          this.transitionTo(`${basePath}.${l}`);
        }
      });
    }
  },

  setupController (controller) {
    controller.setProperties({
      steps: this.get('steps'),
      basePath: this.get('basePath')
    });

    this._super(...arguments);
  },

  actions: {
    saveAndContinue () {
      const controller = this.get('controller'),
            model = controller.get('model');

      this.ajaxStart();

      let key = this.get('key'),
          morph = {};

      morph[key] = true;
      morph[key + 'Step'] = controller.get('currentStepIndex');
      morph[key + 'Progress'] = parseInt(controller.get('progress'), 0);

      if ( this.get('setUserOn') ) {
        morph[this.get('setUserOn')] = this.get('auth.user');
      }

      model.setProperties(morph);

      model.save()
      .then(() => {
        this.ajaxSuccess('Successfully saved progress.');

        if ( !controller.get('nextStep') ) {
          this.transitionTo(this.get('returnPath'));
          return;
        }

        this.transitionTo(`${this.get('basePath')}.${controller.get('nextStep.link')}`);
      })
      .catch(this.ajaxError.bind(this));
    }
  }
});
