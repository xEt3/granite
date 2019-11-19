import Route from '@ember/routing/route';

export default Route.extend({
  async model (params) {
    return  {
      issue:             await this.store.find('employee-issue', params.issue_slug.split('_').pop()),
      correctiveActions: await this.store.query('corrective-action', { employeeIssue: params.issue_slug.split('_').pop() })
    };
  },

  setupController (controller, model) {
    controller.setProperties({
      model:             model.issue,
      correctiveActions: model.correctiveActions
    });
  }
});
