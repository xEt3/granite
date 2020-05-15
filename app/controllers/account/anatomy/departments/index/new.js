import Controller from 'granite/core/controller';
import { inject as service } from '@ember/service';

export default class AccountAnatomyDepartmentsNewController extends Controller {
  @service data

  saveOptions = {
    transitionAfterSave: 'account.anatomy.departments.index',
    transitionWithModel: false
  }
}
