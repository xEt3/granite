import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { Promise } from 'rsvp';
import $ from 'jquery';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

export default Controller.extend(addEdit, {
  auth: service(),
  correctiveActionsDirty: false,
  stagesDirty: false,
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

  afterSave (model) {
    console.log('modelName:', model.get('modelName'));

    let correctiveActionSeverities = model.get('correctiveActionSeverities'),
        removeDuplicates = [];

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
    reorderItems(items) {
      let pipeline = this.get('pipeline'),
          stages = pipeline.stages;

      items.map((stage, i) => {
        const prevIndex = stage.order;

        if (prevIndex !== i) {
          stage.order = i;
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

    beginSeverityEdit (currentSeverity) {
      this.setProperties({
        currentSeverity,
        editingCas: true
      });
      this.send('openSeverityModal');
    },

    addSeverity () {
      let user = this.get('auth.user'),
          severity = this.store.createRecord('corrective-action-severity', {});

      this.set('currentSeverity', severity);
      user.get('company.correctiveActionSeverities').addObject(severity);
    },

    removeSeverity (severity) {
      severity.destroy();
      this.get('auth.user.company.correctiveActionSeverities').removeObject(severity);
      if (severity.id) {
        this.set('correctiveActionsDirty', true);
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
    }
  }
});
