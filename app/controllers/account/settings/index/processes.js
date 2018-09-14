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

  canAddStages: computed('pipeline.stages.length', function () {
    return this.get('pipeline.stages.length') < 5 ? true : false;
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

    if (correctiveActionSeverities) {
      correctiveActionSeverities.forEach(s => {
        if (!s.get('id')) {
          s.destroy();
          removeDuplicates.push(s);
        }
      });
      correctiveActionSeverities.removeObjects(removeDuplicates);
    }

    this.setProperties({
      correctiveActionsDirty: false,
      stagesDirty: false
    });

    this.send('refresh');
  },

  actions: {
    reorderItems (items) {
      let pipeline = this.get('pipeline');

      items.map((stage, i) => {
        const prevIndex = stage.order;

        if (prevIndex !== i) {
          set(stage, 'order', i);
        }
      });

      pipeline.set('stages', items);
      this.set('stagesDirty', JSON.stringify(pipeline) !== this.get('pipelineInitialState'));
    },

    save () {
      if (this.get('correctiveActionsDirty')) {
        this.saveModel(this.get('model'));
      }

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
        context: '.ember-application',
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
        context: '.ember-application',
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
      let stage = {
        order: this.get('pipeline.stages').length
      };

      this.set('currentStage', stage);
      this.get('pipeline.stages').addObject(stage);
    },

    removeSeverity (severity) {
      severity.destroy();
      this.get('auth.user.company.correctiveActionSeverities').removeObject(severity);
      this.set('correctiveActionsDirty', JSON.stringify(this.get('model.correctiveActionSeverities').toArray()) !== this.get('casInitialState'));
    },

    removeStage (stage) {
      this.get('pipeline.stages').removeObject(stage);
      this.set('stagesDirty', JSON.stringify(this.get('pipeline')) !== this.get('pipelineInitialState'));
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
      this.set('correctiveActionsDirty', JSON.stringify(this.get('model.correctiveActionSeverities').toArray()) !== this.get('casInitialState'));
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
      this.set('stagesDirty', JSON.stringify(this.get('pipeline')) !== this.get('pipelineInitialState'));
    }
  }
});
