import Controller from 'granite/core/controller';
import { inject as service } from '@ember/service';
import { states } from 'granite/config/statics';
import { action } from '@ember/object';

export default class AccountEmployeeOffboardOptionsController extends Controller {
  @service data
  states = states

  get stateIsMontana () {
    return this.model.addressState === 'MT';
  }

  @action
  interimAddForm (form) {
    this.availableExitForms.addObject(form);
  }
}
