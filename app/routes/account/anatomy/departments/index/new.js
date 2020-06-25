import Route from 'granite/core/route';
import { inject as service } from '@ember/service';

export default class AccountAnatomyDepartmentsNewRoute extends Route {
  @service auth
  titleToken = 'New Department'
  modelName =  'department'
  routeType = 'add'

  getModelDefaults () {
    return {
      company: this.auth.get('user.company'),
      creator: this.auth.get('user')
    };
  }
}
