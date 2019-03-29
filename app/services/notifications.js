import Service from '@ember/service';
import { Promise, resolve } from 'rsvp';

export default Service.extend({
  isSupported: 'Notification' in window,

  notificationTimeout: 4000,

  requestPermission (force) {
    if (!this.get('isSupported')) {
      return resolve('Not supported');
    }

    if (this.get('permission') === 'granted' || Notification.permission === 'granted') {
      return resolve(true);
    }

    if (this.get('permission') === 'denied' || Notification.permission === 'denied' && !force) {
      return resolve('Permission denied');
    }

    return new Promise((resv) => Notification.requestPermission((response) => {
      this.set('permission', response);

      if (response === 'granted') {
        return resv(true);
      }

      return resv('Permission defined');
    }));
  },

  __checkPermission () {
    return this.requestPermission();
  },

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
      setTimeout(() => notification.close(), this.get('notificationTimeout'));
    });
  }
});
