import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import refreshable from 'granite/mixins/refreshable';

@classic
export default class ProcessesRoute extends Route.extend(refreshable) {
  model() {
    return hash({
      company:  this.modelFor('account.settings'),
      pipeline: this.store.query('recruiting-pipeline', { 'jobOpening.0': { $exists: false } })
      .then(results => results ? results.get('firstObject') : results)
    });
  }

  setupController(controller, model) {
    controller.setProperties({
      model:                model.company,
      pipeline:             model.pipeline,
      casInitialState:      JSON.parse(JSON.stringify(model.company.get('correctiveActionSeverities').toArray())) || [],
      pipelineInitialState: JSON.parse(JSON.stringify(model.pipeline.get('stages').toArray())) || []
    });
  }

  @action
  willTransition(transition) {
    if (!this.controller.disableSave) {
      if (!confirm('You have unsaved changes, are you sure you want to leave this page?')) {
        transition.abort();
      }
    }
  }
}
