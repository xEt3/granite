import Controller from 'granite/core/controller';
import { action } from '@ember/object';
import { states as stateOptions } from 'granite/config';
import { inject as service } from '@ember/service';
import ENV from 'granite/config/environment';

export default class SignupIndexController extends Controller {
  @service data

  useCaptcha = ENV === 'production'
  stateOptions = stateOptions
  selectedState = null
  useMiddleName = false

  @action
  async saveCompany () {
    if (!this.model.validations.isValid) {
      return;
    }

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
