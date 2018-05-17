import Component from '@ember/component';
import { Promise } from 'rsvp';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import ajaxStatus from 'granite/mixins/ajax-status';
import $ from 'jquery';

export default Component.extend(ajaxStatus, {
  store: service(),
  applicantRequiredFields: [ 'firstName', 'lastName', 'phone', 'email' ],
  fileIsAdded: false,
  newApplicant: {},
  newApplication: {},

  resumeEndpoint: computed('model.jobOpening.id', function() {
    return `/api/v1/upload/resume/${this.get('model.jobOpening.id')}`;
  }),

  uploadResume () {
    return new Promise((resolveUpload, rejectUpload) => {
      this.setProperties({ resolveUpload, rejectUpload });
      Dropzone.forElement('.input__dropzone').processQueue();
    });
  },

  modalId: computed('elementId', function () {
    return this.get('elementId') + '-modal';
  }),

  createConfirm () {
    $('#' + this.get('modalId')).modal({
      detachable: true,
      context: 'body.ember-application'
    }).modal('show');

    return new Promise((resolve, reject) => this.setProperties({ resolve, reject }));
  },

  startApplication: computed('modalId', function () {
    return this.createConfirm.bind(this);
  }),

  closeModal () {
    $('#' + this.get('modalId')).modal('hide');
  },

  requiredFieldsFilled () {
    let applicantRequiredFields = this.get('applicantRequiredFields');
    let newApplicant = this.get('newApplicant');
    for (let field in applicantRequiredFields) {
      if (field !== '_super') {
        let value = newApplicant[applicantRequiredFields[field]];
        if (value === "" || value === undefined) {
          return false;
        }
      }
    }
    return true;
  },

  actions: {
    addedFile (file) {
      this.set('fileIsAdded', file);
    },

    removeFile () {
      const $dropzone = Dropzone.forElement('.input__dropzone');

      if (!$dropzone) {
        return;
      }

      $dropzone.removeFile(this.get('fileIsAdded'));
      this.set('fileIsAdded', false);
    },

    uploadError (err) {
      this.get('rejectUpload')(err);
    },

    uploadedFile (prog, response) {
      this.get('resolveUpload')(response);
    },

    uploadProgressUpdate (prog) {
      this.set('uploadProgress', prog);
    },

    cancel () {
      this.setProperties({
        newApplicant: {},
        newApplication: {}
      });
      this.send('removeFile');
      this.closeModal();
    },

    save () {
      const store = this.get('store');
      this.ajaxStart();

      if (!this.requiredFieldsFilled()) {
        this.ajaxError('Must fill required fields', true);
        return;
      }

      let applicant = store.createRecord('applicant', this.get('newApplicant'));

      let application = store.createRecord('jobApplication', Object.assign({}, this.get('newApplication'), {
        jobOpening: this.get('model.jobOpening'),
        applicant,
        reviewedOn: this.get('newApplication').stage ? new Date() : null
      }));

      applicant.save()
        .then(() => {
          if (this.get('fileIsAdded')) {
            return this.uploadResume();
          }
        })
        .then((response) => {
          if (response) {
            store.pushPayload('file', response);
            let fileRecord = store.peekRecord('file', response.file.id);
            application.set('resume', fileRecord);
          }

          return application.save();
        })
        .then(() => {
          this.ajaxSuccess('Saved application successfully');
          this.setProperties({
            newApplicant: {},
            newApplication: {},
          });
          this.send('removeFile');
          this.closeModal();
          this.refresh();
        });
    },

    notify (type, msg) {
      this.get('onNotify')(type, msg);
    }
  }
});
