import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';

export default Mixin.create({
  auth:                    service(),
  authenticationChangeUrl: 'index',

  beforeModel (transition) {
    if (!this.get('auth.authenticated')) {
      this.controllerFor('login').set('previousTransition', transition);
      return this.transitionTo('login');
    }

    this.addObserver('auth.authenticated', this, this.__authenticationStateChanged);

    this._super(...arguments);
  },

  __authenticationStateChanged () {
    if (this.get('auth.authenticated') === false) {
      this.transitionTo(this.authenticationChangeUrl);
    }
  },

  willDestroy () {
    try {
      this.removeObserver('auth.authenticated', this, this.__authenticationStateChanged);
    } catch (e) {
      // noop
    }

    this._super(...arguments);
  }
});
