import Ember from 'ember';
import { notifyDefaults } from 'granite/config';

export default Ember.Route.extend({
  actions: {
    notify (type) {
      const notifications = this.get('controller.notifications'),
            args = Array.prototype.slice.call(arguments, 1);

      args[1] = args[1] ? Ember.$.extend(notifyDefaults, args[1]) : notifyDefaults;
      notifications[type].apply(notifications, args);
    }
  }
});
