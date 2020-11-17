import Controller from 'granite/core/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class AccountSettingsFeaturesController extends Controller {
  @service data
  @tracked notificationListDirtied = false

  notificationTypes = [{
    label:       'Weekly',
    description: 'Weekly summary notifications'
  }, {
    label:       'Per Enrollment',
    description: 'Notification for new enrollments or changes'
  }]

  get selectedUsers () {
    return this.model.benefitNotification.map(notif => {
      return notif.user;
    });
  }

  @action
  updateRecipients (external, users) {
    if (external) {
      this.model.benefitNotification.addObject({
        email:         users[0],
        notifications: []
      });
    } else {
      const notificationsBefore = this.model.benefitNotification,
            externalEmails = this.model.benefitNotification.filter(notif => notif.email);

      this.model.benefitNotification = users.map(user => {
        let currentUser = notificationsBefore.findBy('user', user);

        return {
          user,
          notifications: currentUser ? currentUser.notifications : []
        };
      });
      this.model.benefitNotification.addObjects(externalEmails);
    }


    this.dirtyNotificationList();
  }

  @action
  dirtyNotificationList () {
    //function used to bubble up from notification-row component
    this.notificationListDirtied = true;
  }

  @action
  deleteRecipient (recipient) {
    this.model.benefitNotification.removeObject(recipient);
    this.dirtyNotificationList();
  }
}
