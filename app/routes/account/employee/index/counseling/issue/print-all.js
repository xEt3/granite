import Route from '@ember/routing/route';
import { scheduleOnce, later, next } from '@ember/runloop';
import resource from 'granite/mixins/route-abstractions/resource';

let followThroughPath = 'account.employee.index.counseling.issue';

export default Route.extend(resource, {
  titleToken: 'Print',
  modelName:  'corrective-action',

  afterModel (model) {
    return model.get('employee.department');
  },

  mutateQuery (q) {
    // get the corrective actions where employeeIssue
    // is the issue that we're on
    q.employeeIssue = this.modelFor(followThroughPath).get('id');
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
