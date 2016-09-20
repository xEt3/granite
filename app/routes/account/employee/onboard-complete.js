import Ember from 'ember';

const { Route, run } = Ember;

export default Route.extend({
  afterModel (model) {
    model.setProperties({
      onboarding: false,
      onboardingStep: null,
      onboardingProgress: null
    });
    run.scheduleOnce('afterRender', () => {
      run.later(this, () => {
        this.transitionTo('account.employees.index');
      }, 3000);
    });
  }
});
