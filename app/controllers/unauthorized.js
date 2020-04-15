import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { inject as controller } from '@ember/controller';
import moment from 'moment';

@classic
export default class UnauthorizedController extends Controller {
  @controller('login')
  loginController;

  @service
  auth;

  @computed('fromError')
  get unauthorizedReason() {
    var error = this.fromError;

    if (!error) {
      return 'Undefined Error.';
    }

    var sessionExpires = this.auth.get('session.expires');

    if (moment(sessionExpires).isBefore(moment())) {
      this.loginController.set('fromError', 'Your session has expired. Please log in again.');
      this.transitionToRoute('login');
      return 'Your session has expired.';
    }

    return error.responseText ? 'The server says: ' + error.responseText : 'The server says: ' + error.statusText;
  }
}
