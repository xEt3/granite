import { action } from '@ember/object';
import Route from 'granite/core/route';
import { scheduleOnce, later, next } from '@ember/runloop';

export default class PrintAllRoute extends Route {
  titleToken = 'Counseling';

  queryParams = {
    issue: { refreshModel: true },
    slug:  { refreshModel: true }
  };

  resetController (controller, isExiting) {
    if (isExiting) {
      Object.assign(controller, {
        issue: undefined,
        slug:  undefined
      });
    }
  }

  async model (params) {
    let employee    = super.model(...arguments);
    let queryParams = { employee: employee.id };

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
  }

  @action
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
