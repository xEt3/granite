import classic from 'ember-classic-decorator';
import Controller from '@ember/controller';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

@classic
export default class NewController extends Controller.extend(addEdit) {
  transitionAfterSave = 'account.anatomy.departments.index';
  transitionWithModel = false;

  afterSave () {
    this.send('refresh');
  }
}
