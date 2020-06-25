import Controller from 'granite/core/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class AccountSettingsFormsController extends Controller {
  @service data

  _afterDelete () {
    this.send('refresh');
  }

  @action
  onNotify (type, msg) {
    this.data.notify(type, msg);
  }
}
