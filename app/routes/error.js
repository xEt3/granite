import { action } from '@ember/object';
import Route from 'granite/core/route';

export default class ErrorRoute extends Route {
  titleToken = 'Error';

  @action
  didTransition () {
    const controller = this.controller,
          lf = window.localforage;

    if (!controller.fromError) {
      let previousRoute = lf.getItem('graniteRoutePreviousToError');
      return this.transitionTo(previousRoute && previousRoute !== 'error' ? previousRoute : 'index');
    }

    let previousRoute = controller.previousRoute;

    if (previousRoute) {
      lf.setItem('graniteRoutePreviousToError', previousRoute);
    }
  }

  @action
  willTransition () {
    window.localforage.setItem('graniteRoutePreviousToError', null);
  }
}
