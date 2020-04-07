import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { Promise } from 'rsvp';

export default class FileHandler {
  constructor (opts) {
    this.options = {
      ...this.defaults,
      ...opts
    };
  }

  defaults = {
    /* Make a preflight request to create a file before upload. Use this if you are
    using the file api as-is, without additional middleware. */
    filePreflight:    true,
    /* Base endpoint path for post preflight request - replaces fileEndpoint var with
    parsed endpoint */
    fileBaseEndpoint: '/api/v1/file/:id',
    dropzoneId:       'dropzone' // use your own!
  }

  @tracked options

  // initialize
  fileIsAdded = false

  get fileEndpoint () {
    const { fileBaseEndpoint } = this.options,
          preflightId = this.filePreflightIdentifier;

    return fileBaseEndpoint.replace(':id', preflightId);
  }

  __ajaxStart () {
    if (this.ajaxStart) {
      this.ajaxStart(...arguments);
    }
  }

  __ajaxSuccess () {
    if (this.get('_resolveProcess')) {
      this.get('_resolveProcess')(this.get('__fileModel'));
    }

    if (this.ajaxSuccess) {
      this.ajaxSuccess(...arguments);
    }
  }

  __ajaxError () {
    if (this.get('_rejectProcess')) {
      this.get('_rejectProcess')(...arguments);
    }

    if (this.ajaxError) {
      this.ajaxError(...arguments);
    }
  }

  __doPreflight () {
    const fileData = this.get('fileData');

    return this.store.createRecord('file', fileData)
    .save()
    .then((file = {}) => {
      if (file && file.id) {
        this.__fileModel = file;
        this.filePreflightIdentifier = file.id;
      }

      return file;
    });
  }

  processQueue () {
    const DZ = Dropzone.forElement(`#${this.get('dropzoneId')}`),
          calculatedUrl = this.fileEndpoint;

    DZ.options.url = calculatedUrl;

    return DZ.processQueue();
  }

  @action
  upload () {
    this.__ajaxStart();

    this._processingPromise = new Promise((resolve, reject) => {
      this._resolveProcess = resolve;
      this._rejectProcess = reject;

      // do a preflight request
      if (this.options.filePreflight) {
        return this.__doPreflight()
        .then(() => run.next(() => {
          this.processQueue();
        }))
        .catch(this.__ajaxError.bind(this));
      }

      return this.processQueue();
    });

    return this._processingPromise;
  }

  @action
  addedFile (file) {
    this.setProperties({
      __dropzone:  this,
      __file:      file,
      fileIsAdded: true
    });
  }

  @action
  uploadedFile (dzfile, response) {
    this.get('__fileModel').setProperties(response.file);
    Dropzone.forElement(`#${this.get('dropzoneId')}`).removeAllFiles(dzfile);

    this.__ajaxSuccess(null, true);

    if (this.uploadComplete) {
      let fileId = response.file._id;
      this.store.pushPayload('file', { file: [ response.file ] });
      this.uploadComplete(this.store.peekRecord('file', fileId));
    }
  }

  @action
  removeFile (file) {
    Dropzone.forElement(`#${this.get('dropzoneId')}`).removeAllFiles(file);
    this.set('fileIsAdded', false);
  }
}
