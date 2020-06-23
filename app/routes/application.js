import Ember from 'ember';
import Route from 'granite/core/route';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import progress from 'ember-cli-nprogress';
import { notifyDefaults } from 'granite/config';
import ENV from 'granite/config/environment';

const IS_TEST = ENV.environment === 'test';

const { Logger } = Ember;

const errorRouteMap = {
  401: 'unauthorized',
  404: 'not-found',
  500: 'error',
  400: 'error'
};

export default class ApplicationRoute extends Route {
  title (tokens) {
    return [ ...tokens, 'Granite HR' ].join(' - ');
  }

  @service auth
  @service('notification-messages') notifications

  beforeModel () {
    return IS_TEST ? Promise.resolve() : this.auth.initializeExistingSession();
  }

  @action
  notify (type) {
    const notifications = this.notifications,
          args = Array.prototype.slice.call(arguments, 1);

    args[1] = Object.assign({}, notifyDefaults, args[1]);

    if (IS_TEST) {
      args[1].clearDuration = 1;
    }

    notifications[type].apply(notifications, args);
  }

  @action
  error (error) {
    Logger.error(error);

    var route = 'error',
        err = error.errors ? error.errors[0] : error;

    if (err && err.status) {
      var routeInMap = errorRouteMap[ err.status ];

      if (routeInMap) {
        route = routeInMap;
      }
    }

    Logger.log('Routing to', route, 'to handle UX error...');

    this.controllerFor(route).setProperties({
      fromError:     err,
      previousRoute: this.get('controller.currentPath')
    });

    this.transitionTo('/' + route);
  }

  @action
  async logout (expired) {
    await this.auth.logout();

    if (expired) {
      this.transitionTo('login', { queryParams: { expired: true } });
    }
  }

  @action
  loading (transition) {
    if (IS_TEST) {
      return;
    }

    progress.start();
    transition.finally(() => progress.done());
  }
}
