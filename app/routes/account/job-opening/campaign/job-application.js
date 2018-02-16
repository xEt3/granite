import Route from '@ember/routing/route';
import { Promise, hash } from 'rsvp';

const modelKeys = [ 'model', 'events', 'stage', 'opening', 'screening' ];

export default Route.extend({
  model (params) {
    return hash({
      model: this.store.find('job-application', params.application_id),
      events: this.store.query('event', {
        contextType: 'JobApplication',
        contextId: params.application_id,
        limit: 20,
        sort: {
          start: -1
        }
      }),
      opening: this.modelFor('account.job-opening'),
    })
    .then(hashResults => hash(Object.assign({}, hashResults, {
      stage: hashResults.model.get('stage') ? this.getStage(hashResults.model.get('stage')) : Promise.resolve(),
      screening: hashResults.opening.get('screening')
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
    modelKeys.forEach(k => controller.set(k, response[k]));
  }
});
