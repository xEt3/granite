import Ember from 'ember';

const {
  Route,
  RSVP: { hash, Promise }
} = Ember;

export default Route.extend({
  model (params) {
    return hash({
      app: this.store.find('job-application', params.application_id),
      events: this.store.query('event', {
        contextType: 'JobApplication',
        contextId: params.application_id,
        limit: 20,
        sort: {
          start: -1
        }
      }),
      opening: this.modelFor('account.job-opening')
    })
    .then(hashResults => hash(Object.assign({}, hashResults, {
      stage: hashResults.app.get('stage') ? this.getStage(hashResults.app.get('stage')) : Promise.resolve()
    })));
  },

  getStage (stageId) {
    return this.store.query('recruiting-pipeline', {
      'stages._id': stageId,
      limit: 1
    })
    .then(results => results ? results.get('firstObject.stages').findBy('id', stageId) : results);
  },

  setupController (controller, response) {
    controller.setProperties({
      model: response.app,
      events: response.events,
      stage: response.stage,
      opening: response.opening
    });
  }
});
