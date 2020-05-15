import Controller from 'granite/core/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class AccountAnatomyDepartmentEditController extends Controller {
  @service data

  saveOptions = {
    transitionAfterSave: 'account.anatomy.departments.index',
    transitionWithModel: false
  }

  @action
  cancel () {
    this.model.rollbackAttributes();
    this.transitionToRoute('account.anatomy.departments.index');
  }
}
