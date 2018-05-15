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

  actions: {

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


    save () {
      this.ajaxStart();
      console.log('saving resume:', this.get('fileIsAdded'));

      let applicant = this.get('store').createRecord('applicant', this.get('newApplicant'));

      let application = this.get('store').createRecord('jobApplication', Object.assign({}, this.get('newApplication'), {
        jobOpening: this.get('model.jobOpening'),
        applicant,
        // resume: this.get('fileIsAdded')
      }));

      applicant.save().then(this.uploadResume.bind(this))
      //BREAKS IF YOU DON'T INSERT A RESUME
        .then((response) => {
          console.log('response:', response);
          application.set('resume', response.file._id);
          console.log('application about to be saved:', application.resume);
          return application.save();
        })
        .then((app) => {
          console.log('finished application after save:', app);
          this.ajaxSuccess('Saved application successfully');
          this.setProperties({
            newApplicant: null,
            newApplication: null
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
