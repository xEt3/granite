import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Controller from '@ember/controller';

@classic
export default class FutureChangesController extends Controller {
  @action
  notifyNewEffective () {
    this.send('notify',
      'success',
      'This change has been recorded.  Please give our system a minute to update',
      { clearDuration: 5000 });
    this.send('refresh');
  }
}
