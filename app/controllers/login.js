import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import ajaxStatus from 'granite/mixins/ajax-status';

@classic
export default class LoginController extends Controller.extend(ajaxStatus) {
  @service
  ajax;

  queryParams = [ 'expired', 'recovery' ];
  expired = false;
  recovery = false;

  @action
  async login() {
    const email = this.email,
          password = this.password;

    this.ajaxStart();

    if (!email || !password) {
      return this.ajaxError('Please complete all fields before submitting.');
    }

    try {
      await this.auth.login(email, password);

      let previousTransition = this.previousTransition;
      this.ajaxSuccess('Successfully logged in.');

      if (previousTransition) {
        previousTransition.retry();
      } else {
        this.transitionToRoute('account.index');
      }
    } catch (e) {
      this.ajaxError(e);
    }
  }

  @action
  recover() {
    const email = this.recoveryEmail;
    let wasFatal;

    this.ajaxStart();
    this.set('recoveryEmail', null);

    this.ajax.request('/api/v1/recovery/company-user/', { data: { email } })
    .catch((err = {}) => {
      if (err.status === 500) {
        wasFatal = true;
        this.ajaxError(err);
      }
    })
    .finally(() => {
      if (wasFatal) {
        return;
      }

      this.ajaxSuccess('If your email belongs to a GraniteHR account, you\'ll get an email soon.');
      this.set('recovery', false);
    });
  }
}
