import Route from '@ember/routing/route';
import { scheduleOnce, later, next } from '@ember/runloop';

export default Route.extend({
  titleToken:  'Counseling',
  queryParams: {
    issue: { refreshModel: true },
    slug:  { refreshModel: true }
  },

  resetController (controller, isExiting) {
    if (isExiting) {
      controller.setProperties({
        issue: undefined,
        slug:  undefined
      });
    }
  },

  async model (params) {
    let employee = this._super(...arguments);
    let queryParams = { employee: employee.get('id') };

    if (params.issue) {
      this.slug = params.slug;
      Object.assign(queryParams, { employeeIssue: params.issue });
      this.followThroughPath = 'account.employee.index.counseling.issue';

    } else {
      this.slug = undefined;
      this.followThroughPath = 'account.employee.index.counseling';
    }

    return {
      employee,
      issue:             await this.store.query('employee-issue', { employee: queryParams.employee }),
      correctiveActions: await this.store.query('corrective-action', queryParams)
    };
  },

  actions: {
    async didTransition () {
      next(() => scheduleOnce('afterRender', () => {
        window.print();
        later(() =>  {
          if (this.slug) {
            this.transitionTo(this.followThroughPath, this.slug);
          }
          this.transitionTo(this.followThroughPath);
        }, 100);
      }));
    }
  }
});
