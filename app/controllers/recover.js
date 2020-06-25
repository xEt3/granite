import Controller from 'granite/core/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class RecoverController extends Controller {
  @service ajax
  @service data

  queryParams = [ 'u' ]
  u = null // user id parameter

  @action
  async recover () {
    const password = this.password,
          passwordConfirm = this.passwordConfirm,
          userId = this.u,
          token = this.model;

    let { success, error } = this.data.createStatus();

    if (password !== passwordConfirm) {
      error('Passwords do not match.', true);
      return;
    }

    try {
      await this.ajax
      .post(`/api/v1/recovery/company-user/${userId}`, {
        data: {
          token,
          password
        }
      });

      this.setProperties({
        password:        null,
        passwordConfirm: null
      });

      success('Success! You can login with your new password.');
      this.transitionToRoute('login');
    } catch (e) {
      if (e.status === 500) {
        error(e);
      } else {
        error(e, true);
        this.setProperties({
          password:        null,
          passwordConfirm: null
        });
      }
    }
  }
}
