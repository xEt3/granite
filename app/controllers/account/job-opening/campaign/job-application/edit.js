import Controller from 'granite/core/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { Promise } from 'rsvp';

export default class AccountJobOpeningCampaignJobApplicationEditController extends Controller {
  @service store
  @service data

  @tracked fileIsAdded = false
  @tracked uploadProgress = null

  applicantRequiredFields = [ 'firstName', 'lastName', 'phone', 'email' ]

  get resumeEndpoint () {
    return `/api/v1/upload/resume/${this.model.jobApplication.get('jobOpening.id')}`;
  }

  @action
  uploadResume () {
    return new Promise((resolveUpload, rejectUpload) => {
      this.setProperties({
        resolveUpload,
        rejectUpload
      });
      Dropzone.forElement('.input__dropzone').processQueue();
    });
  }

  @action
  requiredFieldsFilled () {
    let applicantRequiredFields = this.applicantRequiredFields;
    let newApplicant = this.model.applicant;
    for (let field in applicantRequiredFields) {
      if (field !== '_super') {
        let value = newApplicant[applicantRequiredFields[field]];
        if (value === '' || value === undefined || value === null) {
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
    this.removeFile();
    this.transitionToRoute('account.job-opening.campaign.job-application');
  }

  @action
  async save () {
    const store = this.store;
    let { success, error } = this.data.createStatus();

    if (!this.requiredFieldsFilled()) {
      error('Must fill required fields', true);
      return;
    }

    let applicant = await this.model.applicant,
        application = this.model.jobApplication;

    application.setProperties({ applicant });

    try {
      await applicant.save();

      if (this.fileIsAdded) {
        var response = await this.uploadResume();
      }

      if (response) {
        store.pushPayload('file', response);
        var fileRecord = store.peekRecord('file', response.file.id);
        application.resume = fileRecord;
      }

      await application.save();

      success('Updated application successfully');
      this.removeFile();
      this.send('refreshModel');
      this.transitionToRoute('account.job-opening.campaign.job-application');
    } catch (e) {
      error(e);
    }
  }

  @action
  onNotify (type, msg) {
    this.data.notify(type, msg);
  }
}
