import Route from '@ember/routing/route';
import { run } from '@ember/runloop';

export default Route.extend({
  titleToken: 'Finished',

  afterModel () {
    run.scheduleOnce('afterRender', () => {
      run.later(() => this.transitionTo('index'), 4500);
    });
  }
});
