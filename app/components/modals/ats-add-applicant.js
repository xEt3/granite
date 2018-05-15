import Component from '@ember/component';
import { Promise } from 'rsvp';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import ajaxStatus from 'granite/mixins/ajax-status';
import $ from 'jquery';

export default Component.extend(ajaxStatus, {
  store: service(),
  newApplicant: {},
  newApplication: {},

  modalId: computed('elementId', function () {
    return this.get('elementId') + '-modal';
  }),

  createConfirm () {
    $('#' + this.get('modalId')).modal({
      detachable: true
    }).modal('show');

    return new Promise((resolve, reject) => this.setProperties({ resolve, reject }));
  },

  startApplication: computed('modalId', function () {
    return this.createConfirm.bind(this);
  }),

  closeModal () {
    $('#' + this.get('modalId')).modal('hide');
  },

  actions: {
    cancel () {
      this.setProperties({
        newApplicant: {},
        newApplication: {}
      });
      this.closeModal();
    },

    save () {
      this.ajaxStart();

      let applicant = this.get('store').createRecord('applicant', this.get('newApplicant'));

      let application = this.get('store').createRecord('jobApplication', Object.assign({}, this.get('newApplication'), {
        jobOpening: this.get('model.jobOpening'),
        applicant
      }));

      applicant.save().then(() => {

        application.save().then(() => {
          //REFRESH PAGE SOMEHOW
          this.ajaxSuccess('Saved applicant successfully');
          this.setProperties({
            newApplicant: {},
            newApplication: {}
          });
          this.closeModal();
        });
      });

    },

    notify (type, msg) {
      this.get('onNotify')(type, msg);
    },
  }
});
