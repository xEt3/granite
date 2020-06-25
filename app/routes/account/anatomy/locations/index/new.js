import Route from 'granite/core/route';
import { inject as service } from '@ember/service';

export default class AccountAnatomyLocationsNewRoute extends Route {
  @service auth
  titleToken = 'New Location'
  modelName =  'location'
  routeType = 'add'

  async getModelDefaults () {
    let company = await this.auth.get('user.company');
    return {
      company,
      addressState: company.addressState,
      creator:      this.auth.user
    };
  }
}
