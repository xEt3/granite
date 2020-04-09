import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { run } from '@ember/runloop';
import { Promise } from 'rsvp';

export default class FileHandler {
  constructor (opts) {
    this.options = {
      ...this.defaults,
      ...opts
    };

    this.store = opts.store;
    this.data = opts.data;

    if (!this.store) {
      throw new Error('"store" is a required option for the FileHandler class. It must be an instance of ember data store.');
    }
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
  @tracked fileIsAdded = false

  get fileEndpoint () {
    const { fileBaseEndpoint } = this.options,
          preflightId = this.filePreflightIdentifier;

    return fileBaseEndpoint.replace(':id', preflightId);
  }

  __success () {
    if (this._resolveProcess) {
      this._resolveProcess(this.__fileModel);
    }

    if (this.status) {
      this.status.success(...arguments);
    }
  }

  __error () {
    if (this._rejectProcess) {
      this._rejectProcess(...arguments);
    }

    if (this.status) {
      this.status.error(...arguments);
    }
  }

  /**
   * doPreflight
   * @private
   * @returns {Promise} Resolves to the file created by preflight req
   */
  doPreflight () {
    const fileData = this.options.fileData;

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

  /**
   * processQueue
   * @private
   * @description Processes the current files in the dropzone
   * @returns {Object} Dropzone#processQueue response
   */
  processQueue () {
    const DZ = Dropzone.forElement(`#${this.options.dropzoneId}`),
          calculatedUrl = this.fileEndpoint;

    DZ.options.url = calculatedUrl;

    return DZ.processQueue();
  }

  /**
   * Upload action
   * @action
   * @public
   * @description Processes the queue, sets promise properties to "watch"
   * @returns {Promise} Processing promise
   */
  @action
  upload () {
    if (this.data) {
      this.status = this.data.createStatus('fileHandling');
    }

    this._processingPromise = new Promise((resolve, reject) => {
      this._resolveProcess = resolve;
      this._rejectProcess = reject;

      // do a preflight request
      if (this.options.filePreflight) {
        return this.doPreflight()
        .then(() => run.next(() => {
          this.processQueue();
        }))
        .catch(this.status.error);
      }

      return this.processQueue();
    });

    return this._processingPromise;
  }

  @action
  addedFile (file) {
    this.__dropzone = this;
    this.__file = file;
    this.fileIsAdded = true;
  }

  @action
  uploadedFile (dzfile, response) {
    this.__fileModel.setProperties(response.file);
    Dropzone.forElement(`#${this.options.dropzoneId}`).removeAllFiles(dzfile);

    this.__success(null, true);

    if (this.options.uploadComplete) {
      let fileId = response.file._id;
      this.store.pushPayload('file', { file: [ response.file ] });
      this.options.uploadComplete(this.store.peekRecord('file', fileId));
    }
  }

  @action
  removeFile (file) {
    Dropzone.forElement(`#${this.options.dropzoneId}`).removeAllFiles(file);
    this.fileIsAdded = false;
  }
}
