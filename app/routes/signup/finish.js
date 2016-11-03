import Ember from 'ember';

const { Route, run } = Ember;

export default Route.extend({
  afterModel (model) {
    run.scheduleOnce('afterRender', () => {
      run.later(() => this.transitionTo('account.index'), 4500);
    });
  }
});
