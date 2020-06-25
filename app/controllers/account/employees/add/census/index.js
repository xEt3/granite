import Controller from 'granite/core/controller';
import { run } from '@ember/runloop';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class AccountEmployeesAddCensusController extends Controller {
  @service auth
  @service data

  supportedExtensions = [ 'csv', 'xls', 'xlsx' ]

  @action
  fileUploadError (err) {
    this.fileUploadError = err;

    run.later(() => {
      this.fileUploadError = undefined;
    }, 1500);
  }

  @action
  successHandler (response) {
    this.analytics.trackEvent('Employees', 'census_uploaded', 'Census Uploaded');
    this.transitionToRoute('account.employees.add.census.review', response);
  }
}
