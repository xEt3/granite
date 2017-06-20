import Ember from 'ember';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

const { Component, get } = Ember;

const CardPipelineComponent = Component.extend(addEdit, {
  classNames: [ 'pipeline' ],

  actions: {
    setOrder (items/*, item, index*/) {
      const reordered = items.map((app, i) => {
        const prevIndex = app.get('stageOrder');

        if (prevIndex !== i) {
          app.set('stageOrder', i);
          this.saveModel(app);
        }
      });

      const cb = this.get('orderChanged');

      if (cb) {
        cb(reordered);
      }
    },

    moveAppToStage (app, stage) {
      app.setProperties({
        stage: get(stage, '_id'),
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

CardPipelineComponent.reopenClass({
  positionalParams: [ 'candidates' ]
});

export default CardPipelineComponent;
