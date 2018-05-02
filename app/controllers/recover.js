import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import ajaxStatus from 'granite/mixins/ajax-status';

export default Controller.extend(ajaxStatus, {
  ajax: service(),

  queryParams: [ 'u' ],
  u: null, // user id parameter

  actions: {
    recover () {
      const password = this.get('password'),
            passwordConfirm = this.get('passwordConfirm'),
            userId = this.get('u'),
            token = this.get('model');

      this.ajaxStart();

      if (password !== passwordConfirm) {
        this.ajaxError('Passwords do not match.', true);
        return;
      }

      this.get('ajax')
        .post(`/api/v1/recovery/company-user/${userId}`, {
          data: { token, password }
        })
        .then(() => {
          this.setProperties({
            password: null,
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
              password: null,
              passwordConfirm: null
            });
          }
        });
    }
  }
});
