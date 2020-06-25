import classic from 'ember-classic-decorator';
import Service from '@ember/service';
import { Promise, resolve } from 'rsvp';

@classic
export default class NotificationsService extends Service {
  isSupported = 'Notification' in window;
  notificationTimeout = 4000;

  requestPermission (force) {
    if (!this.isSupported) {
      return resolve('Not supported');
    }

    if (this.permission === 'granted' || Notification.permission === 'granted') {
      return resolve(true);
    }

    if (this.permission === 'denied' || Notification.permission === 'denied' && !force) {
      return resolve('Permission denied');
    }

    return new Promise((resv) => Notification.requestPermission((response) => {
      this.set('permission', response);

      if (response === 'granted') {
        return resv(true);
      }

      return resv('Permission defined');
    }));
  }

  __checkPermission () {
    return this.requestPermission();
  }

  send (title, body, icon) {
    return this.__checkPermission()
    .then(permission => {
      if (permission !== true) {
        return;
      }

      let notification = new Notification(title, {
        body,
        icon
      });
      setTimeout(() => notification.close(), this.notificationTimeout);
    });
  }
}
