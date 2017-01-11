import Ember from 'ember';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

const { Controller, RSVP: { Promise } } = Ember;

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

      Ember.$('#modal__add--manual-source').modal({
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
      Ember.$('#modal__add--manual-source').modal('hide');
    }
  }
});
