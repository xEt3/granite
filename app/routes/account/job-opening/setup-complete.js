import Ember from 'ember';

const { Route, run } = Ember;

export default Route.extend({
  afterModel (model) {
    model.setProperties({
      setup: false,
      setupStep: null,
      setupProgress: null,
      completedSetup: new Date()
    });

    model.save().then(() => run.scheduleOnce('afterRender', () => run.later(() => {
      this.transitionTo('account.job-opening');
    }, 5000)));
  }
});
