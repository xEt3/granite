import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend({
  model () {
    return hash({
      company: this.modelFor('account.settings'),
      pipeline: this.store.findAll('recruiting-pipeline')
      .then(results => results ? results.get('firstObject') : results)
    });
  },

  setupController (controller, model) {
    controller.setProperties({
      model: model.company,
      pipeline: model.pipeline
    });
  }
});
