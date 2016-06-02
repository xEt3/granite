import Ember from 'ember';

const { Route, $, RSVP } = Ember;

export default Route.extend({
  model () {
    return RSVP.hash({
      token: $.get('/api/v1/bt/token'),
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
