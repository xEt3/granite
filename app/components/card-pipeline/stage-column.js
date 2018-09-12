import Component from '@ember/component';
import { computed } from '@ember/object';

const PipelineStageComponent = Component.extend({
  classNames: [ 'pipeline__stage' ],

  candidates: computed('activeCandidates.@each.{stage,stageOrder}', 'stage._id', function () {
    const stageId = this.get('stage._id');
    return (this.get('activeCandidates') || []).filter(candidate => stageId === candidate.get('stage')).sortBy('stageOrder');
  }),

  actions: {
    reorderItems (items = [], reordered) {
      this.get('dispatchReorder')(items, reordered, items.indexOf(reordered));
    }
  }
});

PipelineStageComponent.reopenClass({ positionalParams: [ 'stage', 'stages' ] });

export default PipelineStageComponent;
