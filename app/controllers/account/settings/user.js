import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class UserSettingsController extends Controller {
  @service ajax
  @service data
  passwords = {}

  @action
  async change () {
    const {
      newPassword,
      confirmPassword,
      currentPassword
    } = this.passwords;

    const { success, error } = this.data.createStatus();

    if (newPassword !== confirmPassword) {
      error('Passwords do not match.', true);
      return;
    }

    try {
      await this.ajax.post('/api/v1/company-user/change-password', {
        data: {
          newPassword,
          currentPassword
        }
      });
      this.passwords = {};
      success('Successfully changed.');
    } catch (e) {
      this.ajaxError(e);
    }
  }
}
