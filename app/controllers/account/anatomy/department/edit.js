import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Controller from '@ember/controller';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

@classic
export default class EditController extends Controller.extend(addEdit) {
  transitionAfterSave = 'account.anatomy.departments.index';
  transitionWithModel = false;

  @action
  cancel () {
    this.model.rollbackAttributes();
    this.transitionToRoute('account.anatomy.departments.index');
  }
}
