import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as controller } from '@ember/controller';
import { inject as service } from '@ember/service';
import moment from 'moment';

export default Controller.extend({
  loginController: controller('login'),
  auth:            service(),

  unauthorizedReason: computed('fromError', function () {
    var error = this.get('fromError');

    if (!error) {
      return 'Undefined Error.';
    }

    var sessionExpires = this.auth.get('session.expires');

    if (moment(sessionExpires).isBefore(moment())) {
      this.get('loginController').set('fromError', 'Your session has expired. Please log in again.');
      this.transitionToRoute('login');
      return 'Your session has expired.';
    }

    return error.responseText ? 'The server says: ' + error.responseText : 'The server says: ' + error.statusText;
  })
});
