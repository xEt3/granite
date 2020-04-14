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
    return this.get('elementId') + '-modal';
  }

  createConfirm() {
    const store = this.get('store');

    this.setProperties({
      newApplicant:   store.createRecord('applicant', {}),
      newApplication: store.createRecord('jobApplication', {})
    });

    $('#' + this.get('modalId')).modal({
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
    $('#' + this.get('modalId')).modal('hide');
  }

  requiredFieldsFilled() {
    let applicantRequiredFields = this.get('applicantRequiredFields');
    let newApplicant = this.get('newApplicant');
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

    if (this.get('fileIsAdded')) {
      $dropzone.removeFile(this.get('fileIsAdded'));
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

    $dropzone.removeFile(this.get('fileIsAdded'));
    this.set('fileIsAdded', false);
  }

  @action
  uploadError(err) {
    this.get('rejectUpload')(err);
  }

  @action
  uploadedFile(prog, response) {
    this.get('resolveUpload')(response);
  }

  @action
  uploadProgressUpdate(prog) {
    this.set('uploadProgress', prog);
  }

  @action
  cancel() {
    this.get('newApplicant').destroyRecord();
    this.get('newApplication').destroyRecord();

    this.send('removeFile');
    this.closeModal();
  }

  @action
  save() {
    const store = this.get('store');
    this.ajaxStart();

    if (!this.requiredFieldsFilled()) {
      this.ajaxError('Must fill required fields', true);
      return;
    }

    let applicant = this.get('newApplicant'),
        application = this.get('newApplication');

    application.setProperties({
      applicant,
      manualEntry: true,
      jobOpening:  this.get('model.jobOpening'),
      reviewedOn:  this.get('newApplication').stage ? new Date() : null
    });

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
    this.get('onNotify')(type, msg);
  }
}
