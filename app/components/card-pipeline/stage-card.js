import Ember from 'ember';
import Component from '@ember/component';
import { A } from '@ember/array';
import { computed } from '@ember/object';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

const { Logger: { error } } = Ember;

const PipelineCardComponent = Component.extend({
  store: service(),
  classNames: [ 'pipeline-card__content' ],
  classNameBindings: [
    'application.hired:pipeline-card__content--hired',
    'application.disqualified:pipeline-card__content--disqualified'
  ],

  allExceptCurrentStage: computed('stages.[]', 'application.stage', function () {
    const stageId = this.get('application.stage');
    return (this.get('stages') || []).filter(stage => get(stage, '_id') !== stageId);
  }),

  nextMeeting: computed('application.[]', function () {
    return this.get('getNextMeeting').perform();
  }),

  controlsDisabled: computed('application.{hired,disqualified}', function () {
    return this.get('application.hired') || this.get('application.disqualified');
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
