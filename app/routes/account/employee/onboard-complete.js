import Route from '@ember/routing/route';
import { run } from '@ember/runloop';

export default Route.extend({
  titleToken: 'Onboard Complete',

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
