import Controller from 'granite/core/controller';
import { inject as service } from '@ember/service';
import { openEnrollmentForm } from '../../../../controllers/account/benefits/open-enrollment/add';

export default class EditController extends Controller {
  @service data

  afterSaveOptions = { transitionAfterSave: 'account.benefits.open-enrollment' }

  enrollmentForm = openEnrollmentForm
}
