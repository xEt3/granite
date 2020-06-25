import Route from 'granite/core/route';

export default class IssueRoute extends Route {
  async model (params) {
    return  {
      issue:             await this.store.find('employee-issue', params.issue_slug.split('_').pop()),
      correctiveActions: await this.store.query('corrective-action', { employeeIssue: params.issue_slug.split('_').pop() })
    };
  }

  setupController (controller, model) {
    controller.model             = model.issue;
    controller.correctiveActions = model.correctiveActions;
  }
}
