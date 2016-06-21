import Ember from 'ember';

const { Route, RSVP, inject } = Ember;

export default Route.extend({
  ajax: inject.service(),

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
