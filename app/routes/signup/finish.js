import Route from 'granite/core/route';
import { run } from '@ember/runloop';

export default class FinishRoute extends Route {
  titleToken = 'Finished';

  afterModel () {
    run.scheduleOnce('afterRender', () => {
      run.later(() => this.transitionTo('index'), 4500);
    });
  }
}
