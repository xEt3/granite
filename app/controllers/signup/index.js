import Controller from 'granite/core/controller';
import { action } from '@ember/object';
import { states as stateOptions } from 'granite/config';
import { inject as service } from '@ember/service';

export default class SignupIndexController extends Controller {
  @service data

  stateOptions = stateOptions;
  selectedState = null
  useMiddleName = false

  @action
  async saveCompany () {
    let { success, error } = this.data.createStatus();

    try {
      await this.model.save();
      success();
      this.transitionToRoute('signup.billing');
    } catch (e) {
      error(e);
    }
  }
}
