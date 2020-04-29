import Route from 'granite/core/route';
import { action } from '@ember/object';

export default class AccountSettingsProcessesRoute extends Route {
  titleToken = 'Processes'

  async model () {
    let results = await this.store.query('recruiting-pipeline', { 'jobOpening.0': { $exists: false } });

    return {
      company:  this.modelFor('account.settings'),
      pipeline: results ? results.firstObject : results
    };
  }

  setupController (controller, model) {
    controller.setProperties({
      model:                model.company,
      pipeline:             model.pipeline,
      casInitialState:      JSON.parse(JSON.stringify(model.company.correctiveActionSeverities.toArray())) || [],
      pipelineInitialState: JSON.parse(JSON.stringify(model.pipeline.stages.toArray())) || []
    });
  }

  @action
  willTransition (transition) {
    if (!this.controller.disableSave) {
      if (!confirm('You have unsaved changes, are you sure you want to leave this page?')) {
        transition.abort();
      }
    }
  }
}
