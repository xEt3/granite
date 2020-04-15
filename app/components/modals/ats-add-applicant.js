import classic from 'ember-classic-decorator';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { Promise } from 'rsvp';
import ajaxStatus from 'granite/mixins/ajax-status';
import $ from 'jquery';

@classic
export default class AtsAddApplicant extends Component.extend(ajaxStatus) {
  @service
  store;

  applicantRequiredFields = [ 'firstName', 'lastName', 'phone', 'email' ];
  fileIsAdded = false;

  @computed('model.jobOpening.id')
  get resumeEndpoint() {
    return `/api/v1/upload/resume/${this.get('model.jobOpening.id')}`;
  }

  uploadResume() {
    return new Promise((resolveUpload, rejectUpload) => {
      this.setProperties({
        resolveUpload,
        rejectUpload
      });
      Dropzone.forElement('.input__dropzone').processQueue();
    });
  }

  @computed('elementId')
  get modalId() {
    return this.elementId + '-modal';
  }

  createConfirm() {
    const store = this.store;

    this.setProperties({
      newApplicant:   store.createRecord('applicant', {}),
      newApplication: store.createRecord('jobApplication', {})
    });

    $('#' + this.modalId).modal({
      detachable: true,
      closable:   false,
      context:    '.ember-application'
    }).modal('show');

    return new Promise((resolve, reject) => this.setProperties({
      resolve,
      reject
    }));
  }

  @computed('modalId')
  get startApplication() {
    return this.createConfirm.bind(this);
  }

  closeModal() {
    $('#' + this.modalId).modal('hide');
  }

  requiredFieldsFilled() {
    let applicantRequiredFields = this.applicantRequiredFields;
    let newApplicant = this.newApplicant;
    for (let field in applicantRequiredFields) {
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
  addedFile(file) {
    let  $dropzone = Dropzone.forElement('.input__dropzone');

    if (this.fileIsAdded) {
      $dropzone.removeFile(this.fileIsAdded);
    }
    this.set('fileIsAdded', file);
  }

  @action
  removeFile() {
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
    this.set('fileIsAdded', false);
  }

  @action
  uploadError(err) {
    this.rejectUpload(err);
  }

  @action
  uploadedFile(prog, response) {
    this.resolveUpload(response);
  }

  @action
  uploadProgressUpdate(prog) {
    this.set('uploadProgress', prog);
  }

  @action
  cancel() {
    this.newApplicant.destroyRecord();
    this.newApplication.destroyRecord();

    this.send('removeFile');
    this.closeModal();
  }

  @action
  save() {
    const store = this.store;
    this.ajaxStart();

    if (!this.requiredFieldsFilled()) {
      this.ajaxError('Must fill required fields', true);
      return;
    }

    let applicant = this.newApplicant,
        application = this.newApplication;

    application.setProperties({
      applicant,
      manualEntry: true,
      jobOpening:  this.get('model.jobOpening'),
      reviewedOn:  this.newApplication.stage ? new Date() : null
    });

    applicant.save()
    .then(() => {
      if (this.fileIsAdded) {
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
        newApplicant:   null,
        newApplication: null
      });
      this.send('removeFile');
      this.closeModal();
      this.refresh();
    });
  }

  @action
  notify(type, msg) {
    this.onNotify(type, msg);
  }
}
