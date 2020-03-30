import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import routeAbs from './abstractions/routes';

export default class GraniteRoute extends Route {
  @service auth

  __methodForRouteType (methodName) {
    return this.routeType && routeAbs[this.routeType][methodName];
  }

  model () {
    const method = this.__methodForRouteType('model');

    if (method && !this.bypassModelHook) {
      return method.apply(this, arguments);
    }

    return super.model(...arguments);
  }

  @action
  willTransition () {
    const method = this.__methodForRouteType('willTransition');

    if (method) {
      return method.apply(this, arguments);
    }

    if (super.willTransition) {
      return super.willTransition(...arguments);
    }
  }

  @action
  refreshModel () {
    this.refresh();
  }
}
