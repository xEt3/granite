import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { run } from '@ember/runloop';

@classic
export default class FinishRoute extends Route {
  titleToken = 'Finished';

  afterModel() {
    run.scheduleOnce('afterRender', () => {
      run.later(() => this.transitionTo('index'), 4500);
    });
  }
}
