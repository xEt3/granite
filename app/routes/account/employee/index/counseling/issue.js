import Route from '@ember/routing/route';

export default Route.extend({
  model (params) {
    return this.store.find('employee-issue', params.issue_slug.split('_').pop());
  },

  async setupController (controller, model) {
    controller.setProperties({ correctiveActions: await this.store.query('corrective-action', { employeeIssue: model.id }) });
  }
});
