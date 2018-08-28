import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { Promise } from 'rsvp';
import $ from 'jquery';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

export default Controller.extend(addEdit, {
  auth: service(),

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
    let correctiveActionSeverities = model.get('correctiveActionSeverities'),
        removeDuplicates = [];

    correctiveActionSeverities.forEach(s => {
      if (!s.get('id')) {
        s.destroy();
        removeDuplicates.push(s);
      }
    });
    correctiveActionSeverities.removeObjects(removeDuplicates);
  },

  actions: {
    // reorderItems (items = [], reordered) {
    //   console.log('inside reorderItems');
    //   this.send('setOrder')(items);
    // },

    setOrder (items = []/*, item, index*/) {
      console.log('number of items:', items.length);
      console.log('inside setOrder, items:', items);
      const reordered = items.map((stage, i) => {
        console.log('stage:', stage);
        console.log('stage.order:', stage.order);
      });

      this.get('pipeline').save()
      .then(p => {
        console.log('saved pipeline, p:', p);
      });
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
    }
  }
});
