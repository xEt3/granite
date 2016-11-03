import Ember from 'ember';

const { Route, run } = Ember;

export default Route.extend({
  afterModel () {
    run.scheduleOnce('afterRender', () => {
      run.later(() => this.transitionTo('index'), 4500);
    });
  }
});
