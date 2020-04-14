import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Controller from '@ember/controller';
import del from 'granite/mixins/controller-abstractions/delete';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

@classic
export default class FormsController extends Controller.extend(del, addEdit) {
  _afterDelete() {
    this.send('refresh');
  }

  @action
  onNotify(type, msg) {
    this.send('notify', type, msg);
  }
}
