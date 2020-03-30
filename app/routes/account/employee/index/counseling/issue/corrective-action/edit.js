import Route from 'granite/core/route';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import { issueTypes } from 'granite/config/statics';

export default class AccountEmployeeCounselingIssueCorrectiveActionEditRoute extends Route {
  @service auth
  @service ajax
  titleToken = 'Edit'
  modelName =  'corrective-action'
  routeType = 'edit'

  async model () {
    return {
      correctiveAction: this.modelFor('account.employee.index.counseling.issue.corrective-action'),
      issueTypes:       await this.getIssueTypes()
    };
  }

  setupController (controller, model) {
    controller.setProperties({
      model:      model.correctiveAction,
      issueTypes: model.issueTypes
    });
  }

  async getIssueTypes () {
    let res = await this.ajax.request('/api/v1/employee-issues', {
      data: {
        _distinct: true,
        select:    'type'
      }
    });

    return A([ ...issueTypes, ...res ]).uniq();
  }
}
