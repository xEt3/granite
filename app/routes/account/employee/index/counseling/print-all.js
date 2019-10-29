import Route from '@ember/routing/route';
import { scheduleOnce, later, next } from '@ember/runloop';

let followThroughPath = 'account.employee.index.counseling.issue';

export default Route.extend({
  titleToken:  'Counseling',
  queryParams: { issue: { refreshModel: true } },

  async model (params) {
    let employee = this._super(...arguments);

    if (!params.issue) {
      followThroughPath = 'account.employee.index.counseling';

      return {
        employee,
        issues: await this.store.query('correctiveAction', { employee: employee.get('id') })
      };
    }

    return {
      employee,
      issues: await this.store.query('correctiveAction', {
        employee:      employee.get('id'),
        employeeIssue: params.issue
      })
    };
  },

  actions: {
    async didTransition () {
      next(() => scheduleOnce('afterRender', () => {
        window.print();
        later(() => this.transitionTo(followThroughPath), 100);
      }));
    }
  }
});
