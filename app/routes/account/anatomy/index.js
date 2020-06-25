import Route from 'granite/core/route';

export default class IndexRoute extends Route {
  titleToken = 'Company Anatomy';

  async model () {
    return {
      supervisors: await this.store.query('employee', { $report: 'supervisors' }),
      orgHead:     await this.store.query('employee', { $report: 'organizationHead' })
    };
  }

  setupController (controller, model) {
    controller.model = [ model.orgHead.firstObject, ...model.supervisors.toArray() ].uniq();
  }
}
