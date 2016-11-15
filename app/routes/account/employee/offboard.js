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
        offboardingStep: controller.get('currentStepIndex'),
        offboarder: this.get('auth.user'),
        offboarding: true,
        offboardingProgress: parseInt(controller.get('progress'), 0)
      });

      model.save()
      .then(() => {
        this.ajaxSuccess('Successfully saved progress.');

        if ( !controller.get('nextStep') ) {
          this.transitionTo('account.employee.complete-offboarding');
          return;
        }

        this.transitionTo('account.employee.offboard.' + controller.get('nextStep.link'));
      })
      .catch(this.ajaxError.bind(this));
    },
    cancelOffboard() {
      const controller = this.get('controller'),
            model = controller.get('model'),
            offboardProps = [model.offboarding, model.offboardingStep, model.offboarder, model.offboardingProgress, model.terminationDate, model.terminationReason, model.eligibleForRehire, model.finalAddress, model.finalAddressSelfService],
            setProp = function (prop) {
              this.set('prop', undefined);
            };
      offboardProps.invoke(setProp);

      model.save()
      .then(() => this.transitionTo('account.employee.index.index'));
    }
  }
});
// TODO: get rid of redundant key terminatedOn
