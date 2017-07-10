import Ember from 'ember';
import { task } from 'ember-concurrency';

const {
  Component,
  A,
  Logger: { error },
  computed,
  get,
  inject: { service }
} = Ember;

const PipelineCardComponent = Component.extend({
  store: service(),
  classNames: [ 'pipeline-card__content' ],

  allExceptCurrentStage: computed('stages.[]', 'application.stage', function () {
    const stageId = this.get('application.stage');
    return (this.get('stages') || []).filter(stage => get(stage, '_id') !== stageId);
  }),

  nextMeeting: computed('application.[]', function () {
    return this.get('getNextMeeting').perform();
  }),

  getNextMeeting: task(function*() {
    try {
      let results = yield this.get('store').query('event', {
        contextType: 'JobApplication',
        contextId: this.get('application.id'),
        limit: 1,
        start: { $gt: new Date() },
        sort: {
          start: -1
        }
      });

      return (results || A()).get('firstObject');
    } catch (e) {
      error(e);
    }
  }),

  actions: {
    moveTo (stage) {
      this.get('moveAppToStage')(this.get('application'), stage);
    },

    toggleProperty (prop) {
      this.toggleProperty(prop);
    }
  }
});

PipelineCardComponent.reopenClass({
  positionalParams: [ 'application', 'stages' ]
});

export default PipelineCardComponent;
