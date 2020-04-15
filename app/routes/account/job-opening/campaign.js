import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import { resolve } from 'rsvp';

@classic
export default class CampaignRoute extends Route {
  @service
  auth;

  model () {
    return resolve(this.get('auth.user'))
    .then(user => {
      return {
        company:     user.company,
        parentModel: this.modelFor('account.job-opening')
      };
    });
  }

  setupController (controller, model) {
    controller.setProperties({
      model:      model.parentModel,
      EEOEnabled: model.company.get('collectEEO')
    });
  }
}
