import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';

export default Route.extend({
  ajax: service(),

  model () {
    return RSVP.hash({
      token: this.get('ajax').request('/api/v1/bt/token'),
      company: this.modelFor('signup.index')
    });
  },

  setupController (controller, model) {
    controller.setProperties({
      model: model.company,
      braintreeToken: model.token
    });
  }
});
