import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { resolve } from 'rsvp';

export default Route.extend({
  auth: service(),

  model () {
    return resolve(this.get('auth.user'))
    .then(user => {
      return {
        company:     user.company,
        parentModel: this._super(...arguments)
      };
    });
  },

  setupController (controller, model) {
    controller.setProperties({
      model:      model.parentModel,
      EEOEnabled: model.company.get('collectEEO')
    });
  }
});
