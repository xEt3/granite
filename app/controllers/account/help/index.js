import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Controller from '@ember/controller';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

@classic
export default class IndexController extends Controller.extend(addEdit) {
  @action
  resetIntros () {
    let user = this.user;
    user.set('shownHints', []);
    this.send('save', user);
  }
}
