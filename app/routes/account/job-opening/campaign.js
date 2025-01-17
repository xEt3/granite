import Route from 'granite/core/route';
import { inject as service } from '@ember/service';

export default class AccountJobOpeningCampaignRoute extends Route {
  @service auth;

  async model () {
    const user = await this.auth.get('user');

    return {
      company:     await user.company,
      parentModel: this.modelFor('account.job-opening')
    };
  }

  setupController (controller, model) {
    controller.setProperties({
      model:   model.parentModel,
      company: model.company
    });
  }
}
