import classic from 'ember-classic-decorator';
import Controller from '@ember/controller';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';
import { suffixes, gender } from 'granite/config/statics';

@classic
export default class NewController extends Controller.extend(addEdit) {
  suffixes = suffixes;
  gender = gender;
  transitionAfterSave = 'account.employee.onboard.index';
  transitionWithModel = true;

  afterSave() {
    this.analytics.trackEvent('Employees', 'manual_add', 'Employee manually added');
  }
}
