import classic from 'ember-classic-decorator';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import ajaxStatus from 'granite/mixins/ajax-status';

@classic
export default class SetupAccountController extends Controller.extend(ajaxStatus) {
  @service
  ajax;

  queryParams = [ 'a' ];
  a = null;

  @computed('password', 'passwordConfirm')
  get enableActivation () {
    const p = this.password;
    return p && p === this.passwordConfirm;
  }

  @action
  activate () {
    this.ajaxStart();
    const password = this.password,
          id = this.get('model._id');

    this.ajax.post(`/api/v1/company-user/activate/${id}`, {
      data: {
        password,
        activationId: this.a
      }
    })
    .then(result => {
      if (result.activated !== true) {
        return this.ajaxError('Problem activating');
      }

      this.ajaxSuccess('Successfully activated.');
      this.transitionToRoute('login');
    })
    .catch(this.ajaxError.bind(this));
  }
}
