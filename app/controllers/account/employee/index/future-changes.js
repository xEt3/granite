import Controller from 'granite/core/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class AccountEmployeeFutureChangesController extends Controller {
  @service data

  @action
  notifyNewEffective () {
    this.data.notify(
      'success',
      'This change has been recorded.  Please give our system a minute to update',
      { clearDuration: 5000 });
    this.send('refreshModel');
  }
}
