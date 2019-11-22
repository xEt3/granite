import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import modalSupport from 'granite/mixins/modal-support';
import ajaxStatus from 'granite/mixins/ajax-status';

export default Controller.extend(modalSupport, ajaxStatus, {
  ajax: service(),

  actions: {
    async change () {
      let userId = this.get('auth.session.user');
      let current = this.get('current-password');
      let newPassword = this.get('new-password');
      let confirmedPassword = this.get('confirm-password');

      this.ajaxStart();

      console.log('tis', this);

      if (current === newPassword) {
        this.ajaxError('New and Old Passwords can\'t match');
        return;
      }

      if (newPassword === confirmedPassword) {
        try {
          await this.get('ajax').post('/api/v1/company-user/change-password', {
            data: {
              newPassword,
              current,
              userId
            }
          });
          this.set('current-password', null);
          this.set('new-password', null);
          this.set('confirmed-password', null);
          this.ajaxSuccess('Successfully Changed.');

        } catch (e) {
          this.ajaxError(e);
        }

      }



    }
  }
});
