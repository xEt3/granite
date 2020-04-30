import Route from 'granite/core/route';
import { inject as service } from '@ember/service';

export default class AccountSettingsRoute extends Route {
  @service auth

  async model () {
    return await this.auth.get('user.company');
  }

  afterModel (model) {
    const firstStepsCompleted = model.firstStepsCompleted;

    if (!firstStepsCompleted.includes('settings')) {
      firstStepsCompleted.addObject('settings');
      return model.save();
    }
  }
}
