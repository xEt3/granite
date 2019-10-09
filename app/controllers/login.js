import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import ajaxStatus from 'granite/mixins/ajax-status';

export default Controller.extend(ajaxStatus, {
  ajax: service(),

  queryParams: [ 'expired', 'recovery' ],
  expired:     false,
  recovery:    false,

  actions: {
    async login () {
      const email = this.get('email'),
            password = this.get('password');

      this.ajaxStart();

      if (!email || !password) {
        return this.ajaxError('Please complete all fields before submitting.');
      }

      try {
        await this.auth.login(email, password);

        let previousTransition = this.get('previousTransition');
        this.ajaxSuccess('Successfully logged in.');

        if (previousTransition) {
          previousTransition.retry();
        } else {
          this.transitionToRoute('account.index');
        }
      } catch (e) {
        this.ajaxError(e);
      }
    },

    recover () {
      const email = this.get('recoveryEmail');
      let wasFatal;

      this.ajaxStart();
      this.set('recoveryEmail', null);

      this.get('ajax').request('/api/v1/recovery/company-user/', { data: { email } })
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
});
