import Route from 'granite/core/route';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import { issueTypes } from 'granite/config/statics';

export default class AccountEmployeeCounselingIssueNewRoute extends Route {
  @service auth
  @service ajax
  titleToken = 'Corrective Action'
  modelName =  'corrective-action'
  routeType = 'add'

  async model () {
    return {
      correctiveAction: await super.model(...arguments),
      issueTypes:       await this.getIssueTypes()
    };
  }

  async getModelDefaults () {
    let employeeIssue = this.modelFor('account.employee.index.counseling.issue').issue;

    let severity = await this.getLastSeverity();
    return {
      severity,
      employeeIssue,
      type:     employeeIssue.type,
      creator:  await this.auth.get('user.employee'),
      employee: this.modelFor('account.employee')
    };
  }

  setupController (controller, model) {
    controller.setProperties({
      model:      model.correctiveAction,
      issueTypes: model.issueTypes
    });
  }

  async getIssueTypes () {
    let res = await this.get('ajax').request('/api/v1/employee-issues', {
      data: {
        _distinct: true,
        select:    'type'
      }
    });
    return A([ ...issueTypes, ...res ]).uniq();
  }

  async getLastSeverity () {
    let employeeIssue =  this.modelFor('account.employee.index.counseling.issue').issue;
    // Query for corrective actions using this issue and get
    // the first, newest action
    let result = await this.store.query('corrective-action', {
      employeeIssue: employeeIssue.id,
      limit:         1,
      sort:          { created: -1 }
    });
    // Get the first correctiveAction in the APRA or the employeeIssue
    let targetObject = result.firstObject || employeeIssue;
    return targetObject.severity;
  }
}
