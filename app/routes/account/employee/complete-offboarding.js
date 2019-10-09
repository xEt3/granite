import Route from '@ember/routing/route';
import { run } from '@ember/runloop';

export default Route.extend({
  titleToken: 'Completed Offboarding',

  afterModel (model) {
    model.setProperties({
      offboarding:          false,
      offboardingStep:      null,
      offboardingProgress:  null,
      offboardingCompleted: new Date()
    });

    model.save().then(() => run.scheduleOnce('afterRender', () => run.later(() => {
      this.transitionTo('account.employees');
    }, 3000)));
  }
});
