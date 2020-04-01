import Route from './route';
import Controller from './controller';
import { action } from '@ember/object';

function authenticated (constructor) {
  return class GraniteAuthenticatedRoute extends constructor {
    authenticationChangeUrl = 'index'

    beforeModel (transition) {
      if (!this.get('auth.authenticated')) {
        this.controllerFor('login').set('previousTransition', transition);
        return this.transitionTo('login');
      }

      this.addObserver('auth.authenticated', this, this.__authenticationStateChanged);

      super.beforeModel(...arguments);
    }

    __authenticationStateChanged () {
      if (this.get('auth.authenticated') === false) {
        this.transitionTo(this.get('authenticationChangeUrl'));
      }
    }

    @action
    willDestroy () {
      try {
        this.removeObserver('auth.authenticated', this, this.__authenticationStateChanged);
      } catch (e) {
        // noop
      }

      super.willDestroy(...arguments);
    }
  };
}

export {
  Route,
  Controller,
  authenticated
};
