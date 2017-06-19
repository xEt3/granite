import Ember from 'ember';

const { Component, computed } = Ember;

const PipelineStageComponent = Component.extend({
  classNames: [ 'pipeline__stage' ],

  candidates: computed('activeCandidates.@each.stage', 'stage._id', function () {
    const stageId = this.get('stage._id');
    return (this.get('activeCandidates') || []).filter(candidate => stageId === candidate.get('stage'));
  })
});

PipelineStageComponent.reopenClass({
  positionalParams: [ 'stage' ]
});

export default PipelineStageComponent;
