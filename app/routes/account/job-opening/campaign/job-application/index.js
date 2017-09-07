import Ember from 'ember';

const {
  Route,
  RSVP: { hash, Promise }
} = Ember;

const modelKeys = [ 'model', 'events', 'stage', 'opening', 'screening' ];

export default Route.extend({
  model () {
    return this.modelFor('account.job-opening.campaign.job-application');
  },

  setupController (controller, response) {
    modelKeys.forEach(k => controller.set(k, response[k]));
  }
});
