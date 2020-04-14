import classic from 'ember-classic-decorator';
import Controller from '@ember/controller';
import del from 'granite/mixins/controller-abstractions/delete';

@classic
export default class IndexController extends Controller.extend(del) {
  transitionAfterSave = 'account.employee.index.education';
}
