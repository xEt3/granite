import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import refreshable from 'granite/mixins/refreshable';

export default Route.extend(refreshable, {
  model () {
    return hash({
      company:  this.modelFor('account.settings'),
      pipeline: this.store.query('recruiting-pipeline', { 'jobOpening.0': { $exists: false } })
      .then(results => results ? results.get('firstObject') : results)
    });
  },

  setupController (controller, model) {
    controller.setProperties({
      model:                model.company,
      pipeline:             model.pipeline,
      casInitialState:      JSON.stringify(model.company.get('correctiveActionSeverities').toArray()),
      pipelineInitialState: JSON.stringify(model.pipeline)
    });
  },

  actions: {
    willTransition (transition) {
      if (!this.controller.disableSave) {
        if (!confirm('You have unsaved changes, are you sure you want to leave this page?')) {
          transition.abort();
        }
      }
    }
  }
});
