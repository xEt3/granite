import Route from 'granite/core/route';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import { issueTypes } from 'granite/config/statics';

export default class AccountEmployeeCounselingNewRoute extends Route {
  @service auth
  @service ajax
  titleToken = 'New Issue'
  modelName =  'employee-issue'
  routeType = 'add'

  async model () {
    return {
      issue:      await super.model(...arguments),
      issueTypes: await this.getIssueTypes(),
      users:      this.users
    };
  }

  async getModelDefaults () {
    return {
      creator:  await this.auth.get('user.employee'),
      employee: this.modelFor('account.employee')
    };
  }

  setupController (controller, model) {
    controller.setProperties({
      model:      model.issue,
      issueTypes: model.issueTypes,
      users:      model.users
    });
  }

  async getIssueTypes () {
    let res = await this.get('ajax').request('/api/v1/employee-issues', {
      data: {
        _distinct: true,
        select:    'type'
      }
    });
    return A(issueTypes.concat(res)).uniq();
  }

  get users () {
    // users cannot exclude themselves
    let $nin = [ this.auth.get('user.id') ];
    return this.store.query('company-user', { _id: { $nin } });
  }
}
