import Ember from 'ember';

const { Route, run } = Ember;

export default Route.extend({
  afterModel (model) {
    model.setProperties({
      onboarding: false,
      onboardingStep: null,
      onboardingProgress: null
    });
    model.save().then(() => {
      run.scheduleOnce('afterRender', () => {
        run.later(() => {
          this.transitionTo('account.employee', model);
        }, 3000);
      });
    });
  }
});
