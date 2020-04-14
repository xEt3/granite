import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { run } from '@ember/runloop';

@classic
export default class OnboardCompleteRoute extends Route {
  titleToken = 'Onboard Complete';

  afterModel(model) {
    model.setProperties({
      onboarding:         false,
      onboardingStep:     null,
      onboardingProgress: null
    });

    this.analytics.trackEvent('Employees', 'onboarding_completed', 'Completed Onboarding');

    model.save().then(() => {
      run.scheduleOnce('afterRender', () => {
        run.later(() => {
          this.transitionTo('account.employee', model);
        }, 3000);
      });
    });
  }
}
