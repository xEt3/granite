import Service from '@ember/service';
// import { computed } from '@ember/object';
import { Promise, resolve } from 'rsvp';

export default Service.extend({
  isSupported: 'Notification' in window,

  notificationTimeout: 4000,

  requestPermission (force) {
    console.log('getting permission for notifications');
    if (!this.get('isSupported')) {
      console.log('not supported');
      return resolve('Not supported');
    }

    if (this.get('permission') === 'granted' || Notification.permission === 'granted') {
      console.log('already granted')
      return resolve(true);
    }

    if (this.get('permission') === 'denied' || Notification.permission === 'denied' && !force) {
      console.log('denied');
      return resolve('Permission denied');
    }

    return new Promise((resv) => Notification.requestPermission((response) => {
      console.log('got notification response', response);
      this.set('permission', response);
      Notification.permission = response;

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
        console.log('could not get notification permission');
        return;
      }
      console.log('creating notification', title, body, icon);
      let notification = new Notification(title, { body, icon });
      setTimeout(() => notification.close(), this.get('notificationTimeout'));
    });
  }
});
