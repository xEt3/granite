import Controller from '@ember/controller';
import { computed, set } from '@ember/object';
import { inject as service } from '@ember/service';
import { Promise } from 'rsvp';
import $ from 'jquery';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

export default Controller.extend(addEdit, {
  auth: service(),
  correctiveActionsDirty: false,
  stagesDirty: false,

  canAddStages: computed('pipeline.stages[]', function () {
    return this.get('pipeline.stages').length < 5 ? true : false;
  }),

  disableSave: computed('correctiveActionsDirty', 'stagesDirty', function () {
    return this.get('correctiveActionsDirty') || this.get('stagesDirty') ? false : true;
  }),

  severityForm: computed(() => [{
    label: 'Name',
    type: 'text',
    path: 'name',
    placeholder: 'ex. Written Warning'
  }, {
    label: 'Order/Severity',
    type: 'number',
    path: 'order',
    placeholder: 'ex. 1 for verbal warnings',
    inputAttrs: {
      min: '1'
    }
  }, {
    label: 'Is this option formal/written?',
    type: 'checkbox',
    path: 'formal'
  }]),

  stageForm: computed(() => [{
    label: 'Name of stage',
    type: 'text',
    path: 'name',
    placeholder: 'ex. Interview'
  }]),

  afterSave (model) {
    let correctiveActionSeverities = model.get('correctiveActionSeverities'),
        removeDuplicates = [];

    if (!correctiveActionSeverities) {
      return;
    }

    correctiveActionSeverities.forEach(s => {
      if (!s.get('id')) {
        s.destroy();
        removeDuplicates.push(s);
      }
    });
    correctiveActionSeverities.removeObjects(removeDuplicates);
    this.setProperties({
      correctiveActionsDirty: false,
      stagesDirty: false
    });
  },

  checkDirty (arrayOne, arrayTwo) {
    if (arrayOne.length !== arrayTwo.length) {
      return true;
    }

    for (let i = 0; i < arrayOne.length; i++) {
      if (arrayOne[i] !== arrayTwo[i]) {
        return true;
      }
    }

    return false;
  },

  actions: {
    reorderItems (items) {
      console.log('reordering items');
      let pipeline = this.get('pipeline'),
          stages = pipeline.stages;

      console.log('stages:', stages);

      items.map((stage, i) => {
        const prevIndex = stage.order;

        if (prevIndex !== i) {
          console.log(`${stage.name} is moving to slot ${stage.order}`);
          console.log('stage:', stage);
          // stage.order = i;
          set(stage, 'order', i);
        }
      });

      let isDirty = this.get('checkDirty')(stages, items);

      if (isDirty) {
        this.set('stagesDirty', true);
        pipeline.set('stages', items);
      }
    },

    save () {
      //check CAS and save company
      if (this.get('correctiveActionsDirty')) {
        this.saveModel(this.get('model'));
      }

      //check stages and save pipeline
      if (this.get('stagesDirty')) {
        this.saveModel(this.get('pipeline'));
      }
    },




    openSeverityModal () {
      this.set('respondedSeverityAddition', false);

      if (!this.get('editingCas')) {
        this.send('addSeverity');
      }

      $('#modal__add-cas').modal({
        detachable: true,
        onHidden: () => {
          if ( !this.get('respondedSeverityAddition') ) {
            this.send('respondSeverityAddition', false);
          }
        }
      }).modal('show');

      return new Promise((resolveSeverity, rejectSeverity) => this.setProperties({ resolveSeverity, rejectSeverity }));
    },

    openStageModal () {
      this.set('respondedStageAddition', false);

      if (!this.get('editingStage')) {
        this.send('addStage');
      }

      $('#modal__add-stage').modal({
        detachable: true,
        onHidden: () => {
          if ( !this.get('respondedStageAddition') ) {
            this.send('respondStageAddition', false);
          }
        }
      }).modal('show');

      return new Promise((resolveStage, rejectStage) => this.setProperties({ resolveStage, rejectStage }));
    },

    beginSeverityEdit (currentSeverity) {
      this.setProperties({
        currentSeverity,
        editingCas: true
      });
      this.send('openSeverityModal');
    },

    beginStageEdit (currentStage) {
      this.setProperties({
        currentStage,
        editingStage: true
      });
      this.send('openStageModal');
    },

    addSeverity () {
      let user = this.get('auth.user'),
          severity = this.store.createRecord('corrective-action-severity', {});

      this.set('currentSeverity', severity);
      user.get('company.correctiveActionSeverities').addObject(severity);
    },

    addStage () {
      let stage = this.store.createRecord('pipeline-stage', {
        order: this.get('pipeline.stages').length
      });

      this.set('currentStage', stage);
      this.get('pipeline.stages').addObject(stage);
    },

    removeSeverity (severity) {
      severity.destroy();
      this.get('auth.user.company.correctiveActionSeverities').removeObject(severity);
      if (severity.id) {
        this.set('correctiveActionsDirty', true);
      }
    },

    removeStage (stage) {
      stage.destroy();
      this.get('pipeline.stages').removeObject(stage);
      if (stage.id) {
        this.set('stagesDirty', true);
      }
    },

    respondSeverityAddition (response) {
      this.get(response ? 'resolveSeverity' : 'rejectSeverity')(response);
      this.set('respondedSeverityAddition', true);
      $('#modal__add-cas').modal('hide');

      let currentSeverity = this.get('currentSeverity');

      if (!response && !this.get('editingCas')) {
        this.send('removeSeverity', currentSeverity);
      }

      this.set('editingCas', false);

      if (response) {
        this.set('correctiveActionsDirty', true);
      }
    },

    respondStageAddition (response) {
      this.get(response ? 'resolveStage' : 'rejectStage')(response);
      this.set('respondedStageAddition', true);
      $('#modal__add-stage').modal('hide');

      let currentStage = this.get('currentStage');

      if (!response && !this.get('editingStage')) {
        this.send('removeStage', currentStage);
      }

      this.set('editingStage', false);

      if (response) {
        this.set('stagesDirty', true);
      }
    }
  }
});
