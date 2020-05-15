import Controller from 'granite/core/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { Promise } from 'rsvp';
import { inject as service } from '@ember/service';

export default class AccountDocumentsNewController extends Controller {
  @service data

  @tracked fileIsAdded = false

  saveOptions = {
    transitionAfterSave: 'account.documents.index',
    transitionWithModel: false
  }

  tagSuggestions = [ 'Reference', 'Employee Specific', 'Company Wide', 'Onboarding', 'Offboarding' ]

  @action
  addedFile (file) {
    if (this.fileIsAdded) {
      this.removeFile(this.fileIsAdded);
    }
    this.fileIsAdded = file;
  }

  @action
  processQueue () {
    Dropzone.forElement('#input__dropzone--document').processQueue();
  }

  @action
  uploadedFile (file, res) {
    res.files = [ res.file ];
    delete res.file;
    this.store.pushPayload(res);
    this.resolveUpload(this.store.peekRecord('file', res.files[0].id));
    this.removeFile(file);
  }

  @action
  removeFile (file) {
    Dropzone.forElement('#input__dropzone--document').removeFile(file);
    this.fileIsAdded = false;
  }

  @action
  leaveUpload () {
    this.removeFile(this.fileIsAdded);
    this.fileIsAdded = false;
    this.transitionToRoute('account.document.index');
  }

  // HERE
  @action
  async uploadFile () {
    let promise = new Promise(resolve => this.set('resolveUpload', resolve));
    this.processQueue();

    let file = await promise;
    let properties = [ 'title', 'description', 'tags' ];

    properties.forEach(prop => {
      file[prop] = this[prop];
      this[prop] = null;
    });

    this.data.saveRecord(this.model);
  }
}
