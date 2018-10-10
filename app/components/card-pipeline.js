import Component from '@ember/component';
import { get } from '@ember/object';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

const CardPipelineComponent = Component.extend(addEdit, {
  classNames: [ 'pipeline' ],

  actions: {
    setOrder (targetStageId, { sourceList, sourceIndex, targetList, targetIndex }) {
      const items = this.get('candidates'),
            item = sourceList.objectAt(sourceIndex),
            movedStage = sourceList !== targetList,
            newIndex = targetIndex === 0 ? 1 : targetIndex;

      let targetListCopy = [ ...targetList ];

      if (sourceList === targetList) {
        targetListCopy.removeAt(sourceIndex);
      }

      targetListCopy.insertAt(newIndex, item);

      targetListCopy.slice(1).forEach((app, i) => {
        if (app.get && app.get('stageOrder') !== i) {
          const candidate = items.findBy('id', app.get('id'));
          candidate.set('stageOrder', i);

          if (!movedStage && newIndex - 1 !== i) {
            this.saveModel(candidate);
          }
        }
      });

      if (movedStage) {
        let newStageId = targetListCopy[0],
            candidate = items.findBy('id', targetListCopy.objectAt(newIndex).get('id'));

        candidate.set('stage', newStageId);
        this.saveModel(candidate);

        const cb = this.get('appChangedStage');

        if (cb) {
          cb(candidate, targetStageId);
        }
      }
    },

    moveAppToStage (app, stage) {
      app.setProperties({
        stage:      get(stage, '_id'),
        stageOrder: -1
      });

      this.saveModel(app);

      const cb = this.get('appChangedStage');

      if (cb) {
        cb(app, stage);
      }
    },

    notify () {
      // noop
    }
  }
});

CardPipelineComponent.reopenClass({ positionalParams: [ 'candidates' ] });

export default CardPipelineComponent;
