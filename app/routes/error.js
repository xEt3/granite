import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Route from 'granite/core/route';

@classic
export default class ErrorRoute extends Route {
  titleToken = 'Error';

  @action
  didTransition () {
    const controller = this.controller,
          lf = window.localforage;

    if (!controller.fromError) {
      return lf.getItem('graniteRoutePreviousToError').then(previousRoute => {
        return this.transitionTo(previousRoute && previousRoute !== 'error' ? previousRoute : 'index');
      });
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
