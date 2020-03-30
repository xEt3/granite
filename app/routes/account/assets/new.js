import Route from 'granite/core/route';
import { inject as service } from '@ember/service';

export default class AccountAssetsNewRoute extends Route {
  @service auth
  titleToken = 'New Assets'
  modelName =  'asset'
  routeType = 'add'

  getModelDefaults () {
    return {
      creator: this.auth.get('user'),
      company: this.auth.get('user.company')
    };
  }
}
