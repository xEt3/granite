import Controller from 'granite/core/controller';
import { inject as service } from '@ember/service';

export default class AccountEmployeeEducationTrainingAssignmentController extends Controller {
  @service data

  deleteOptions = { transitionAfterSave: 'account.employee.index.education' }
}
