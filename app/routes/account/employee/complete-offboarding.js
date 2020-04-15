import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { run } from '@ember/runloop';

@classic
export default class CompleteOffboardingRoute extends Route {
  titleToken = 'Completed Offboarding';

  afterModel (model) {
    model.setProperties({
      offboarding:          false,
      offboardingStep:      null,
      offboardingProgress:  null,
      offboardingCompleted: new Date()
    });

    this.analytics.trackEvent('Employees', 'offboarding_completed', 'Completed Offboarding');
    this.analytics.trackEvent('Features', 'automated_exit_interview', model.autoExitInterview ? 'Used' : 'Did not use');

    model.save().then(() => run.scheduleOnce('afterRender', () => run.later(() => {
      this.transitionTo('account.employees');
    }, 3000)));
  }
}
