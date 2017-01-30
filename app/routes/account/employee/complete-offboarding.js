import Ember from 'ember';

const { Route, run } = Ember;

export default Route.extend({
  afterModel (model) {
    model.setProperties({
      offboarding: false,
      offboardingStep: null,
      offboardingProgress: null
    });

    model.save().then(() => run.scheduleOnce('afterRender', () => run.later(() => {
      this.transitionTo('account.employees');
    }, 3000)));
  }
});
