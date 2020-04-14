import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Route from '@ember/routing/route';

@classic
export default class ErrorRoute extends Route {
  titleToken = 'Error';

  @action
  didTransition() {
    const controller = this.get('controller'),
          lf = window.localforage;

    if (!controller.get('fromError')) {
      return lf.getItem('graniteRoutePreviousToError').then(previousRoute => {
        return this.transitionTo(previousRoute && previousRoute !== 'error' ? previousRoute : 'index');
      });
    }

    let previousRoute = controller.get('previousRoute');

    if (previousRoute) {
      lf.setItem('graniteRoutePreviousToError', previousRoute);
    }
  }

  @action
  willTransition() {
    window.localforage.setItem('graniteRoutePreviousToError', null);
  }
}
