import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default Route.extend({
  auth: service(),

  model () {
    return hash({
      parentModel: this._super(...arguments),
      company:     this.auth.get('user.company')
    });
  },

  setupController (controller, model) {
    controller.setProperties({
      model:      model.parentModel,
      EEOEnabled: model.company.get('collectEEO')
    });
  }
});
