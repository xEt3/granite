import Route from '@ember/routing/route';
import { scheduleOnce, later, next } from '@ember/runloop';

let followThroughPath = 'account.employee.index.counseling.issue.corrective-action';

export default Route.extend({
  titleToken: 'Print',

  afterModel (model) {
    return model.get('employee.department');
  },

  actions: {
    didTransition () {
      next(() => scheduleOnce('afterRender', () => {
        window.print();
        later(() => this.transitionTo(followThroughPath), 100);
      }));
    }
  }
});
