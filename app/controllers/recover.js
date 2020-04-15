import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import ajaxStatus from 'granite/mixins/ajax-status';

@classic
export default class RecoverController extends Controller.extend(ajaxStatus) {
  @service
  ajax;

  queryParams = [ 'u' ];
  u = null; // user id parameter

  @action
  recover () {
    const password = this.password,
          passwordConfirm = this.passwordConfirm,
          userId = this.u,
          token = this.model;

    this.ajaxStart();

    if (password !== passwordConfirm) {
      this.ajaxError('Passwords do not match.', true);
      return;
    }

    this.ajax
    .post(`/api/v1/recovery/company-user/${userId}`, {
      data: {
        token,
        password
      }
    })
    .then(() => {
      this.setProperties({
        password:        null,
        passwordConfirm: null
      });

      this.ajaxSuccess('Success! You can login with your new password.');
      this.transitionToRoute('login');
    })
    .catch((err = {}) => {
      if (err.status === 500) {
        this.ajaxError(err);
      } else {
        this.ajaxError(err, true);
        this.setProperties({
          password:        null,
          passwordConfirm: null
        });
      }
    });
  }
}
