import { inject as service } from '@ember/service';
import Route from 'granite/core/route';
import { resolve } from 'rsvp';

export default class CampaignRoute extends Route {
  @service auth;

  async model () {
    let user = await resolve(this.get('auth.user'));
    return {
      company:     user.company,
      parentModel: this.modelFor('account.job-opening')
    };
  }

  setupController (controller, model) {
    Object.assign(controller, {
      model:      model.parentModel,
      EEOEnabled: model.company.get('collectEEO')
    });
  }
}
