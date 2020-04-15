import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Route from '@ember/routing/route';

@classic
export default class LoginRoute extends Route {
  titleToken = 'Login';

  resetController (controller, isExiting) {
    if (isExiting) {
      controller.set('expired', false);
    }
  }

  @action
  willTransition () {
    this.controller.set('previousTransition', null);
  }
}
