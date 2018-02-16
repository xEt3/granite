import Controller from '@ember/controller';
import { Promise } from 'rsvp';
import $ from 'jquery';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

export default Controller.extend(addEdit, {
  mutSelect (type, source) {
    let selected = this.get(`model.${type}`);

    if (selected.includes(source)) {
      selected.removeObject(source);
    } else {
      selected.pushObject(source);
    }
  },

  actions: {
    mutSelection (source) {
      this.mutSelect('applicantSources', source);
    },

    mutManualSelection (source) {
      this.mutSelect('manualApplicantSources', source);
    },

    addToSelection (source) {
      this.get('model.manualApplicantSources').addObject(source);
    },

    addManualSource () {
      this.setProperties({
        manualSource: this.store.createRecord('manual-applicant-source'),
        respondedManualSource: false
      });

      $('#modal__add--manual-source').modal({
        detachable: true,
        onHidden: () => {
          if ( !this.get('respondedManualSource') ) {
            this.send('respondManualSource', false);
          }
        }
      }).modal('show');

      return new Promise((resolveMs, rejectMs) => this.setProperties({ resolveMs, rejectMs }));
    },

    respondManualSource (response) {
      if ( !response ) {
        this.get('manualSource').destroyRecord();
      }

      this.get(response ? 'resolveMs' : 'rejectMs')(response ? this.get('manualSource') : null);
      this.set('respondedManualSource', true);
      $('#modal__add--manual-source').modal('hide');
    }
  }
});
