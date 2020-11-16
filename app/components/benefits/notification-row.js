import Component from '@glimmer/component';
import { action, computed, set } from '@ember/object';

export default class BenefitsNotificationRowComponent extends Component {
  @computed('args.recipient.notifications.[]')
  get checked () {
    let { recipient: { notifications }, type } = this.args;
    return notifications.includes(type);
  }

  @action
  async modifyNotifications () {
    let { recipient, type, dirtyNotificationList } = this.args;

    if (recipient.notifications.includes(type)) {
      set(recipient, 'notifications', recipient.notifications.filter(item => item !== type));
    } else {
      set(recipient, 'notifications', [ ...recipient.notifications, type ]);
    }

    dirtyNotificationList();
  }
}
