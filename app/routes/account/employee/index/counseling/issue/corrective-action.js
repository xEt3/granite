import Route from 'granite/core/route';

export default class AccountEmployeeIssueCorrectiveActionRoute extends Route {
  model (params) {
    return this.store.find('corrective-action', params.action_id);
  }
}
