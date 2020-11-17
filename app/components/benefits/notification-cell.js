import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class BenefitsNotificationCellComponent extends Component {
  get checked () {
    return this.args.notifications.includes(this.args.type);
  }

  @action
  async modifyNotifications () {
    let { notifications, type, dirtyNotificationList } = this.args;

    if (notifications.includes(type)) {
      notifications.removeObject(type);
    } else {
      notifications.addObject(type);
    }

    dirtyNotificationList();
  }
}
