import Controller from 'granite/core/controller';
import { states } from 'granite/config/statics';
import { inject as service } from '@ember/service';

export default class AccountEmployeeOnboardIndex extends Controller {
  @service data
  states = states

  get stateIsMontana () {
    return this.model.addressState === 'MT';
  }
}
