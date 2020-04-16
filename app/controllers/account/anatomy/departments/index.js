import Controller from 'granite/core/controller';
import { inject as service } from '@ember/service';
import { inject as controller } from '@ember/controller';
import { equal } from '@ember/object/computed';

export default class AccountAnatomyDepartmentsController extends Controller {
  @service data
  @controller application
  @equal('application.currentPath', 'account.anatomy.departments.index.new') addingDepartment

  queryParams =      [ 'page' ]
  limit =            20
}
