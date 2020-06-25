import Controller from 'granite/core/controller';
import { inject as service } from '@ember/service';
import { forms } from 'granite/config/forms/educate-add';

export default class AccountEmployeeEducationCertificationEditController extends Controller {
  @service data

  currentForm = forms.certification
  saveOptions = { transitionAfterSave: 'account.employee.index.education.certification.index' }
}
