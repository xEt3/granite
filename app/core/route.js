import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { route } from './abstractions';

export default class GraniteRoute extends Route {
  model () {
    const method = this.__methodForRouteType('model');

    if (method) {
      return method.apply(this, arguments);
    }

    super.model(...arguments);
  }

  __methodForRouteType (methodName) {
    return this.routeType && route[this.routeType][methodName];
  }

  @action
  willTransition () {
    const method = this.__methodForRouteType('willTransition');

    if (method) {
      return method.apply(this, arguments);
    }

    super.willTransition(...arguments);//JAMES, THIS LINE HAS ERROR WHEN TRANSITIONING FROM ACTIONITEMS/DISCUSSION
  }

  @action
  refreshModel () {
    this.refresh();
  }
}
