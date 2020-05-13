import Route from 'granite/core/route';
import { run } from '@ember/runloop';

export default class CompleteOffboardingRoute extends Route {
  titleToken = 'Completed Offboarding';

  async afterModel (model) {
    model.offboarding          = false;
    model.offboardingStep      = null;
    model.offboardingProgress  = null;
    model.offboardingCompleted = new Date();

    this.analytics.trackEvent('Employees', 'offboarding_completed', 'Completed Offboarding');
    this.analytics.trackEvent('Features', 'automated_exit_interview', model.autoExitInterview ? 'Used' : 'Did not use');

    await model.save();
    run.scheduleOnce('afterRender', () => run.later(() => {
      this.transitionTo('account.employees');
    }, 3000));
  }
}
