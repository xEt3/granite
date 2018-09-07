import Ember from 'ember';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import progress from 'ember-cli-nprogress';
import { notifyDefaults } from 'granite/config';
import ENV from 'granite/config/environment';
import $ from 'jquery';

const { Logger } = Ember;

const errorRouteMap = {
  401: 'unauthorized',
  404: 'not-found',
  500: 'error',
  400: 'error'
};

export default Route.extend({
  title (tokens) {
    return [ ...tokens, 'Granite HR' ].join(' - ');
  },
  auth: service(),
  notifications: service('notification-messages'),

  beforeModel () {
    return ENV.environment === 'test' ? Promise.resolve() : this.get('auth').initializeExistingSession();
  },

  actions: {
    notify (type) {
      const notifications = this.get('notifications'),
            args = Array.prototype.slice.call(arguments, 1);

      args[1] = args[1] ? $.extend(notifyDefaults, args[1]) : notifyDefaults;
      notifications[type].apply(notifications, args);
    },

    error ( error ) {
      Logger.error(error);

      var route = 'error',
          err = error.errors ? error.errors[0] : error;

      if ( err && err.status ) {
        var routeInMap = errorRouteMap[ err.status ];

        if ( routeInMap ) {
          route = routeInMap;
        }
      }

      Logger.log('Routing to', route, 'to handle UX error...');

      this.controllerFor(route).setProperties({
        fromError: err,
        previousRoute: this.get('controller.currentPath')
      });

      this.transitionTo('/' + route);
    },

    logout ( expired ) {
      this.get('auth').logout()
      .then(() => {
        if ( expired ) {
          this.transitionTo('login', { queryParams: { expired: true } });
        }
      });
    },

    loading ( transition ) {
      progress.start();
      transition.finally(() => progress.done());
    }
  }
});
