import Component from '@ember/component';
import { Promise } from 'rsvp';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import ajaxStatus from 'granite/mixins/ajax-status';
import $ from 'jquery';

export default Component.extend(ajaxStatus, {
  store: service(),
  applicantRequiredFields: [ 'firstName', 'lastName', 'phone', 'email' ],
  applicationRequiredFields: [ 'coverLetter' ],
  newApplicant: {},
  newApplication: {},
  employee: null,

  resumeEndpoint: computed('model.jobOpening.id', function() {
    return `/api/v1/upload/resume/${this.get('model.jobOpening.id')}`;
  }),

  uploadResume () {
    console.log('inside of uploadResume');
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

  requiredFieldsFilled () {
    let applicantRequiredFields = this.get('applicantRequiredFields');
    let applicationRequiredFields = this.get('applicationRequiredFields');
    let newApplicant = this.get('newApplicant');
    let newApplication = this.get('newApplication');
    for (let field in applicantRequiredFields) {
      if (field !== '_super') {
        let value = newApplicant[applicantRequiredFields[field]];
        if (value === "" || value === undefined) {
          return false;
        }
      }
    }

    for (let field in applicationRequiredFields) {
      if (field !== '_super') {
        let value = newApplication[applicationRequiredFields[field]];
        if (value === "" || value === undefined) {
          return false;
        }
      }
    }
    return true;
  },

  actions: {
    toggleInternalEmployee () {
      this.toggleProperty('internalEmployee');
      this.set('employee', null);
    },

    addedFile (file) {
      this.set('fileIsAdded', file);
      console.log('just set the file:', this.get('fileIsAdded'));
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

    // TODO: use uploadProgress
    uploadProgressUpdate (prog) {
      this.set('uploadProgress', prog);
    },

    cancel () {
      this.setProperties({
        newApplicant: null,
        newApplication: null
      });
      this.closeModal();
    },

    setInternalApplicant () {
      let employee = this.get('employee');

      this.set('newApplicant', {
        firstName: employee.firstName,
        middleName: employee.middleName,
        lastName: employee.lastName,
        phone: employee.phone,
        email: employee.email
      });
    },

    save () {
      this.ajaxStart();

      if (!this.requiredFieldsFilled()) {
        this.ajaxError('Must fill required fields');
        return;
      }

      let applicant = this.get('store').createRecord('applicant', this.get('newApplicant'));

      let application = this.get('store').createRecord('jobApplication', Object.assign({}, this.get('newApplication'), {
        jobOpening: this.get('model.jobOpening'),
        applicant,
        employee: this.get('employee') ? this.get('employee') : null
      }));

      applicant.save().then(() => {
        //uploading resume if it exists
        if (this.get('fileIsAdded')) {
          return this.uploadResume();
        }
      })
      //then setting resume on app and saving app
        .then((response) => {
          if (response) {
            application.set('resume', response.file._id);
          }
          return application.save();
        })
        .then(() => {
          this.ajaxSuccess('Saved application successfully');
          this.setProperties({
            newApplicant: {},
            newApplication: {},
            employee: null
          });
          this.closeModal();
          this.refresh();
        });

    },

    notify (type, msg) {
      this.get('onNotify')(type, msg);
    }
  }
});
