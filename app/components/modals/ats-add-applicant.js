import Component from '@glimmer/component';
import { elementId } from 'granite/core';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { Promise } from 'rsvp';
import $ from 'jquery';

@elementId
export default class ModalsAtsAddApplicant extends Component {
  @service store
  @service data

  @tracked fileIsAdded = false
  @tracked uploadProgress = null
  @tracked newApplicant = {}
  @tracked newApplication = {}

  applicantRequiredFields = [ 'firstName', 'lastName', 'phone', 'email' ]

  get resumeEndpoint () {
    return `/api/v1/upload/resume/${this.args.model.jobOpening.id}`;
  }

  @action
  uploadResume () {
    return new Promise((resolveUpload, rejectUpload) => {
      this.resolveUpload = resolveUpload;
      this.rejectUpload = rejectUpload;

      Dropzone.forElement('.input__dropzone').processQueue();
    });
  }

  get modalId () {
    return this.elementId + '-modal';
  }

  @action
  createConfirm () {
    const store = this.store;

    this.newApplicant = store.createRecord('applicant', {});
    this.newApplication = store.createRecord('jobApplication', {});

    $('#' + this.modalId).modal({
      detachable: true,
      closable:   false,
      context:    '.ember-application'
    }).modal('show');

    return new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }

  @action
  closeModal () {
    $('#' + this.modalId).modal('hide');
  }

  @action
  requiredFieldsFilled () {
    const { applicantRequiredFields, newApplicant } = this;

    for (var field in applicantRequiredFields) {
      if (field !== '_super') {
        let value = newApplicant[applicantRequiredFields[field]];
        if (value === '' || value === undefined) {
          return false;
        }
      }
    }
    return true;
  }

  @action
  addedFile (file) {
    let  $dropzone = Dropzone.forElement('.input__dropzone');

    if (this.fileIsAdded) {
      $dropzone.removeFile(this.fileIsAdded);
    }
    this.fileIsAdded = file;
  }

  @action
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

    $dropzone.removeFile(this.fileIsAdded);
    this.fileIsAdded = false;
  }

  @action
  uploadError (err) {
    this.rejectUpload(err);
  }

  @action
  uploadedFile (prog, response) {
    this.resolveUpload(response);
  }

  @action
  uploadProgressUpdate (prog) {
    this.uploadProgress = prog;
  }

  @action
  cancel () {
    this.newApplicant.destroyRecord();
    this.newApplication.destroyRecord();

    this.removeFile();
    this.closeModal();
  }

  @action
  async save () {
    const store = this.store;
    let { success, error } = this.data.createStatus();

    if (!this.requiredFieldsFilled()) {
      error('Must fill required fields', true);
      return;
    }

    let applicant = this.newApplicant,
        application = this.newApplication;

    application.setProperties({
      applicant,
      manualEntry: true,
      jobOpening:  this.args.model.jobOpening,
      reviewedOn:  this.newApplication.stage ? new Date() : null
    });

    try {
      await applicant.save();

      let response = null;

      if (this.fileIsAdded) {
        response = await this.uploadResume();
      }

      if (response) {
        store.pushPayload('file', response);
        let fileRecord = store.peekRecord('file', response.file.id);
        application.resume = fileRecord;
      }

      await application.save();

      success('Saved application successfully');
      this.newApplicant = {};
      this.newApplication = {};
      this.removeFile();
      this.closeModal();
      this.args.refresh();
    } catch (e) {
      error(e);
    }
  }
}
