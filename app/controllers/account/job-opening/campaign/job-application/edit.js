import Controller from '@ember/controller';
import { Promise } from 'rsvp';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import ajaxStatus from 'granite/mixins/ajax-status';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

export default Controller.extend(ajaxStatus, addEdit, {
  store:                   service(),
  applicantRequiredFields: [ 'firstName', 'lastName', 'phone', 'email' ],
  fileIsAdded:             false,

  resumeEndpoint: computed('model.jobOpening.id', function () {
    return `/api/v1/upload/resume/${this.get('model.jobApplication.jobOpening.id')}`;
  }),

  uploadResume () {
    return new Promise((resolveUpload, rejectUpload) => {
      this.setProperties({
        resolveUpload,
        rejectUpload
      });
      Dropzone.forElement('.input__dropzone').processQueue();
    });
  },

  requiredFieldsFilled () {
    let applicantRequiredFields = this.get('applicantRequiredFields');
    let newApplicant = this.get('model.applicant');
    for (let field in applicantRequiredFields) {
      if (field !== '_super') {
        let value = newApplicant[applicantRequiredFields[field]];
        if (value === '' || value === undefined || value === null) {
          return false;
        }
      }
    }
    return true;
  },

  actions: {
    addedFile (file) {
      let  $dropzone = Dropzone.forElement('.input__dropzone');

      if (this.get('fileIsAdded')) {
        $dropzone.removeFile(this.get('fileIsAdded'));
      }
      this.set('fileIsAdded', file);
    },

    removeFile () {
      let $dropzone;

      try {
        $dropzone = Dropzone.forElement('.input__dropzone');
      } catch (error) {
        return;
      }

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
      this.send('removeFile');
      this.transitionToRoute('account.job-opening.campaign.job-application');
    },

    async save () {
      const store = this.get('store');
      this.ajaxStart();

      if (!this.requiredFieldsFilled()) {
        this.ajaxError('Must fill required fields', true);
        return;
      }

      let applicant = await this.get('model.applicant'),
          application = this.get('model.jobApplication');

      application.setProperties({ applicant });

      await applicant.save();

      if (this.get('fileIsAdded')) {
        var response = await this.uploadResume();
      }

      if (response) {
        store.pushPayload('file', response);
        var fileRecord = store.peekRecord('file', response.file.id);
        application.set('resume', fileRecord);
      }

      await application.save();

      this.ajaxSuccess('Updated application successfully');
      this.send('removeFile');
      this.send('refresh');
      this.transitionToRoute('account.job-opening.campaign.job-application');
    },

    onNotify (type, msg) {
      this.send('notify', type, msg);
    }
  }
});
