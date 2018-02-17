import Route from '@ember/routing/route';
import { run } from '@ember/runloop';

export default Route.extend({
  afterModel () {
    run.scheduleOnce('afterRender', () => {
      run.later(() => this.transitionTo('index'), 4500);
    });
  }
});
