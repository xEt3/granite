import Controller from 'granite/core/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class AccountSettingsFeaturesController extends Controller {
  @service data
  @tracked notificationListDirtied = false

  notificationTypes = [{
    label:       'Weekly',
    description: 'weekly desc'
  }, {
    label:       'Per Enrollment',
    description: 'per enroll desc'
  }]

  get selectedUsers () {
    return this.model.notificationListBenefits.map(notif => {
      return notif.user;
    });
  }

  @action
  updateRecipients (users) {
    this.model.notificationListBenefits = users.map(user => {
      return {
        user,
        notifications: []
      };
    });

    this.dirtyNotificationList();
  }

  @action
  dirtyNotificationList () {
    //function used to bubble up from notification-row component
    this.notificationListDirtied = true;
  }

  @action
  deleteRecipient (recipient) {
    this.model.notificationListBenefits.removeObject(recipient);
    this.dirtyNotificationList();
  }
}
