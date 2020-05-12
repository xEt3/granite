import Route from 'granite/core/route';
import { action } from '@ember/object';

export default class LoginRoute extends Route {
  titleToken = 'Login'

  resetController (controller, isExiting) {
    if (isExiting) {
      controller.expired = false;
    }
  }

  @action
  willTransition () {
    this.controller.previousTransition = null;
  }
}
