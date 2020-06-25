import Route from 'granite/core/route';
import { inject as service } from '@ember/service';

export default class AccountAnatomyLocationsRoute extends Route {
  @service auth
  titleToken = 'Locations'
  queryParams = { page: { refreshModel: true } }

  async model (params) {
    let limit = 20,
        page = (params.page || 1) - 1,
        company = await this.auth.get('user.company'),
        locations = await this.store.query('location', { 'company': company.id }, {
          page,
          limit
        });

    return {
      company,
      locations
    };
  }

  setupController (controller, model) {
    controller.setProperties({
      model:   model.locations,
      company: model.company
    });
  }
}
