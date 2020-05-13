import Route from 'granite/core/route';
import { run } from '@ember/runloop';

export default class OnboardCompleteRoute extends Route {
  titleToken = 'Onboard Complete';

  async afterModel (model) {
    model.onboarding         = false;
    model.onboardingStep     = null;
    model.onboardingProgress = null;

    this.analytics.trackEvent('Employees', 'onboarding_completed', 'Completed Onboarding');

    await model.save();

    run.scheduleOnce('afterRender', () => {
      run.later(() => {
        this.transitionTo('account.employee', model);
      }, 3000);
    });
  }
}
