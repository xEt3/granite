import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Route from '@ember/routing/route';
import { scheduleOnce, later, next } from '@ember/runloop';

let followThroughPath = 'account.employee.index.counseling.issue.corrective-action';

@classic
export default class PrintRoute extends Route {
  titleToken = 'Print';

  afterModel (model) {
    return model.get('employee.department');
  }

  @action
  didTransition () {
    next(() => scheduleOnce('afterRender', () => {
      window.print();
      later(() => this.transitionTo(followThroughPath), 100);
    }));
  }
}
