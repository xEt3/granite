import Ember from 'ember';
import { notifyDefaults } from 'granite/config';

const errorRouteMap = {
  401: 'unauthorized',
  404: 'not-found',
  500: 'error',
  400: 'error'
};

export default Ember.Route.extend({
  actions: {
    notify (type) {
      const notifications = this.get('controller.notifications'),
            args = Array.prototype.slice.call(arguments, 1);

      args[1] = args[1] ? Ember.$.extend(notifyDefaults, args[1]) : notifyDefaults;
      notifications[type].apply(notifications, args);
    },

    error( error ) {
      Ember.Logger.error(error);

      var route = 'error',
          err = error.errors ? error.errors[0] : error;

      if ( err && err.status ) {
        var routeInMap = errorRouteMap[ err.status ];

        if ( routeInMap ) {
          route = routeInMap;
        }
      }

      Ember.Logger.log('Routing to', route, 'to handle UX error...');

      this.controllerFor(route).set('fromError', err);
      this.transitionTo('/' + route);
    }
  }
});
