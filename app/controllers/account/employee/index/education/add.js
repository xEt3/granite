import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import Controller from '@ember/controller';
import { forms } from 'granite/config/forms/educate-add';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

@classic
export default class AddController extends Controller.extend(addEdit) {
  queryParams = [ 'type' ];
  transitionAfterSave = 'account.employee.index.education.index';
  transitionWithModel = false;

  @computed('type')
  get currentForm() {
    return forms[this.type];
  }
}
