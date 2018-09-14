import Route from '@ember/routing/route';
import { run } from '@ember/runloop';

export default Route.extend({
  titleToken: 'Setup Finished',

  afterModel (model) {
    model.setProperties({
      setup:          false,
      setupStep:      null,
      setupProgress:  null,
      completedSetup: new Date()
    });

    model.save().then(() => run.scheduleOnce('afterRender', () => run.later(() => {
      this.transitionTo('account.job-opening');
    }, 5000)));
  }
});
