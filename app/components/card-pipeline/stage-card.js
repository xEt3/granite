import Ember from 'ember';

const { Component, computed, get } = Ember;

const PipelineCardComponent = Component.extend({
  classNames: [ 'pipeline-card__content' ],

  allExceptCurrentStage: computed('stages.[]', 'application.stage', function () {
    const stageId = this.get('application.stage');
    return (this.get('stages') || []).filter(stage => get(stage, '_id') !== stageId);
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
