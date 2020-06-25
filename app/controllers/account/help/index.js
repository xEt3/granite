import Controller from 'granite/core/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class AccountHelpController extends Controller {
  @service data

  @action
  resetIntros () {
    this.user.shownHints = [];
    this.data.saveRecord(this.user);
  }
}
