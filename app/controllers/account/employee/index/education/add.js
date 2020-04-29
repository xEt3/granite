import Controller from 'granite/core/controller';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { forms } from 'granite/config/forms/educate-add';

export default class AccountEmployeeEducationAddController extends Controller {
  @service data
  @tracked type = null

  queryParams = [ 'type' ]
  saveOptions = {
    transitionAfterSave: 'account.employee.index.education.index',
    transitionWithModel: false
  }

  get currentForm () {
    return forms[this.type];
  }
}
