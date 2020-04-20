import Component from '@glimmer/component';
import { get, action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class CardPipelineComponent extends Component {
  @service data

  @action
  setOrder (targetStageId, { sourceList, sourceIndex, targetList, targetIndex }) {
    const items = this.candidates,
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
          this.saveRecord(candidate);
        }
      }
    });

    if (movedStage) {
      let newStageId = targetListCopy[0],
          candidate = items.findBy('id', targetListCopy.objectAt(newIndex).get('id'));

      candidate.set('stage', newStageId);
      this.saveRecord(candidate);

      const cb = this.appChangedStage;

      if (cb) {
        cb(candidate, targetStageId);
      }
    }
  }

  @action
  moveAppToStage (app, stage) {
    app.setProperties({
      stage:      get(stage, '_id'),
      stageOrder: -1
    });

    this.saveRecord(app);

    const cb = this.appChangedStage;

    if (cb) {
      cb(app, stage);
    }
  }

  @action
  notify () {
    // noop
  }
}
