import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import ajaxStatus from 'granite/mixins/ajax-status';

export default Controller.extend(ajaxStatus, {
  ajax:        service(),
  queryParams: [ 'a' ],
  a:           null,

  enableActivation: computed('password', 'passwordConfirm', function () {
    const p = this.get('password');
    return p && p === this.get('passwordConfirm');
  }),

  actions: {
    activate () {
      this.ajaxStart();
      const password = this.get('password'),
            id = this.get('model._id');

      this.get('ajax').post(`/api/v1/company-user/activate/${id}`, {
        data: {
          password,
          activationId: this.get('a')
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
});
