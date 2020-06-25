import Route from 'granite/core/route';
import { inject as service } from '@ember/service';

export default class AccountEmployeeDocumentsNewRoute extends Route {
  @service auth
  titleToken = 'New Document'
  modelName =  'file-assignment'
  routeType = 'add'

  getModelDefaults () {
    return {
      creator:  this.auth.get('user.employee'),
      company:  this.auth.get('user.company'),
      employee: this.modelFor('account.employee')
    };
  }
}
