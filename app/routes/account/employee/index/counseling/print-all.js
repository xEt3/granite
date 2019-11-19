import Route from '@ember/routing/route';
import { scheduleOnce, later, next } from '@ember/runloop';

export default Route.extend({
  titleToken:  'Counseling',
  queryParams: {
    issue: { refreshModel: true },
    slug:  { refreshModel: true }
  },
  followThroughPath: 'account.employee.index.counseling.issue',
  slug:              null,

  async model (params) {
    let employee = this._super(...arguments);

    let queryParams = { employee: employee.get('id') };

    if (params.issue) {
      this.slug = params.slug;
      Object.assign(queryParams, { employeeIssue: params.issue });
    } else {
      this.followThroughPath = 'account.employee.index.counseling';
    }

    return {
      employee,
      issues: await this.store.query('correctiveAction', queryParams)
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
