import Controller from '@ember/controller';
import { action } from '@ember/object';
import { suffixes, gender } from 'granite/config/statics';
import { inject as service } from '@ember/service';

export default class AccountEmployeesAddNewController extends Controller {
  @service data

  saveOptions = {
    transitionAfterSave: 'account.employee.onboard.index',
    transitionWithModel: true
  }

  suffixes = suffixes;
  gender = gender;

  @action
  afterSave () {
    this.analytics.trackEvent('Employees', 'manual_add', 'Employee manually added');
  }
}
