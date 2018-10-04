import Component from '@ember/component';
import { A } from '@ember/array';
import { computed } from '@ember/object';

const PipelineStageComponent = Component.extend({
  classNames: [ 'pipeline__stage' ],

  candidates: computed('activeCandidates.@each.{stageOrder,stage}', 'stage._id', function () {
    const stageId = this.get('stage._id');
    return A([ stageId, ...(this.get('activeCandidates') || []).filter(candidate => stageId === candidate.get('stage')).sortBy('stageOrder') ]);
  })
});

PipelineStageComponent.reopenClass({ positionalParams: [ 'stage', 'stages' ] });

export default PipelineStageComponent;
