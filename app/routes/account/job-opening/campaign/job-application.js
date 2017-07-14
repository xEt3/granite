import Ember from 'ember';

const {
  Route,
  RSVP: { hash }
} = Ember;

export default Route.extend({
  model (params) {
    return hash({
      app: this.store.find('job-application', params.application_id),
      events: this.store.query('event', {
        contextType: 'JobApplication',
        contextId: this.get('application.id'),
        limit: 20,
        sort: {
          start: -1
        }
      })
    });
  },

  setupController (controller, response) {
    controller.setProperties({
      model: response.app,
      events: response.events
    });
  }
});
