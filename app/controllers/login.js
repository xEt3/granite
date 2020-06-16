import Controller from 'granite/core/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class LoginController extends Controller {
  @service ajax
  @service data

  @tracked expired = false
  @tracked recovery = false
  @tracked previousTransition

  queryParams = [ 'expired', 'recovery' ]

  @action
  async login () {
    const email = this.email,
          password = this.password;

    let { success, error } = this.data.createStatus();

    if (!email || !password) {
      return error('Please complete all fields before submitting.');
    }

    try {
      await this.auth.login(email, password);

      let previousTransition = this.previousTransition;
      success('Successfully logged in.');

      if (previousTransition) {
        previousTransition.retry();
      } else {
        this.transitionToRoute('account.index');
      }
    } catch (e) {
      error(e);
    }
  }

  @action
  async recover () {
    const email = this.recoveryEmail;
    let wasFatal;

    let { success, error } = this.data.createStatus();
    this.recoveryEmail = null;

    try {
      await this.ajax.request('/api/v1/recovery/company-user/', { data: { email } });
    } catch (e) {
      if (e.status === 500) {
        wasFatal = true;
        error(e);
      }
    }

    if (wasFatal) {
      return;
    }

    success('If your email belongs to a GraniteHR account, you\'ll get an email soon.');
    this.recovery = false;
  }
}
