import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import modalSupport from 'granite/mixins/modal-support';
import ajaxStatus from 'granite/mixins/ajax-status';

export default Controller.extend(modalSupport, ajaxStatus, {
  ajax:      service(),
  passwords: {},

  actions: {
    async change () {
      let { passwords } = this;

      this.ajaxStart();

      if (passwords.newPassword !== passwords.confirmPassword) {
        this.ajaxError('Passwords do not match.');
        return;
      }

      try {
        await this.get('ajax').post('/api/v1/company-user/change-password', {
          data: {
            passwords,
            userId: this.get('auth.userId')
          }
        });
        this.set('passwords', {});
        this.ajaxSuccess('Successfully Changed.');
      } catch (e) {
        this.ajaxError(e);
      }
    }
  }
});
