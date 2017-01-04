import Ember from 'ember';
import ajaxStatus from 'granite/mixins/ajax-status';

const { Route, inject } = Ember;

export default Route.extend(ajaxStatus, {
  auth: inject.service(),

  actions: {
    saveAndContinue () {
      const controller = this.get('controller'),
            model = controller.get('model');

      this.ajaxStart();

      model.setProperties({
        setup: true,
        setupStep: controller.get('currentStepIndex'),
        setupProgress: parseInt(controller.get('progress'), 0)
      });

      model.save()
      .then(() => {
        this.ajaxSuccess('Successfully saved progress.');

        if ( !controller.get('nextStep') ) {
          this.transitionTo('account.job-opening.campaign');
          return;
        }

        this.transitionTo('account.job-opening.setup.' + controller.get('nextStep.link'));
      })
      .catch(this.ajaxError.bind(this));
    },

    startSetup () {
      this.get('controller').set('model.offboarding', true);
      this.send('saveAndContinue');
    }
  }
});
