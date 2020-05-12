import Controller from 'granite/core/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class SetupAccountController extends Controller {
  @service ajax
  @service data

  @tracked password
  @tracked passwordConfirm

  queryParams = [ 'a' ]
  a = null

  get enableActivation () {
    const p = this.password;
    return p && p === this.passwordConfirm;
  }

  @action
  async activate () {
    let { success, error } = this.data.createStatus();
    const password = this.password,
          id = this.model._id;

    try {
      let result = await this.ajax.post(`/api/v1/company-user/activate/${id}`, {
        data: {
          password,
          activationId: this.a
        }
      });

      if (result.activated !== true) {
        return error('Problem activating');
      }

      success('Successfully activated.');
      this.transitionToRoute('login');
    } catch (e) {
      error(e);
    }
  }
}
