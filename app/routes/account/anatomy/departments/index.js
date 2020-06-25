import Route from 'granite/core/route';
import { inject as service } from '@ember/service';

export default class AccountAnatomyDepartmentsRoute extends Route {
  @service auth;
  titleToken = 'Departments'
  queryParams = { page: { refreshModel: true } }

  async model (params) {
    let limit = 20,
        page = (params.page || 1) - 1,
        company = await this.auth.get('user.company'),
        companyId = company.id,
        departments = await this.store.query('department', {
          page,
          limit,
          'company': companyId
        });

    return {
      company,
      departments
    };
  }

  setupController (controller, model) {
    controller.setProperties({
      model:   model.departments,
      company: model.company
    });
  }
}
