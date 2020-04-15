import Route from 'granite/core/route';
import { inject as service } from '@ember/service';

export default class AccountAnatomyCompanyUsersRoute extends Route {
  @service auth
  @service ajax
  titleToken = 'Users'

  queryParams = { page: { refreshModel: true } }

  async model (params) {
    let limit = 10,
        page = (params.page || 1) - 1;

    return {
      allUsers:     await this.ajax.request('/api/v1/company-users', { data: { inactive: { $ne: true } } }),
      limitedUsers: await this.store.query('company-user', {
        page,
        limit,
        _id: { $ne: this.auth.get('user.id') }
      })
    };
  }

  setupController (controller, model) {
    controller.setProperties({
      model:    model.limitedUsers,
      allUsers: model.allUsers.companyUser
    });
  }
}
