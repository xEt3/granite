/*
  This mixin adds file handling capabilities, for use on a controller
 */

import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import { run } from '@ember/runloop';
import RSVP from 'rsvp';

export default Mixin.create({
  /* Make a preflight request to create a file before upload. Use this if you are
  using the file api as-is, without additional middleware. */
  filePreflight:    true,
  /* Base endpoint path for post preflight request - replaces fileEndpoint var with
  parsed endpoint */
  fileBaseEndpoint: '/api/v1/file/:id',

  // initialize
  fileIsAdded: false,
  dropzoneId:  'dropzone', // use your own!

  fileEndpoint: computed('fileBaseEndpoint', 'filePreflightIdentifier', function () {
    const fileBaseEndpoint = this.fileBaseEndpoint,
          preflightId = this.filePreflightIdentifier;

    return fileBaseEndpoint.replace(':id', preflightId);
  }),

  __ajaxStart () {
    if (this.ajaxStart) {
      this.ajaxStart(...arguments);
    }
  },

  __ajaxSuccess () {
    if (this._resolveProcess) {
      this._resolveProcess(this.__fileModel);
    }

    if (this.ajaxSuccess) {
      this.ajaxSuccess(...arguments);
    }
  },

  __ajaxError () {
    if (this._rejectProcess) {
      this._rejectProcess(...arguments);
    }

    if (this.ajaxError) {
      this.ajaxError(...arguments);
    }
  },

  __doPreflight () {
    const fileData = this.fileData;

    return this.store.createRecord('file', fileData)
    .save()
    .then((file = {}) => {
      if (file && file.get('id')) {
        this.set('__fileModel', file);
        this.set('filePreflightIdentifier', file.get('id'));
      }

      return file;
    });
  },

  processQueue () {
    const DZ = Dropzone.forElement(`#${this.dropzoneId}`),
          calculatedUrl = this.fileEndpoint;

    DZ.options.url = calculatedUrl;

    return DZ.processQueue();
  },

  upload () {
    this.__ajaxStart();

    this.set('_processingPromise', new RSVP.Promise((resolve, reject) => {
      this.set('_resolveProcess', resolve);
      this.set('_rejectProcess', reject);

      // do a preflight request
      if (this.filePreflight) {
        return this.__doPreflight()
        .then(() => run.next(() => {
          this.processQueue();
        }))
        .catch(this.__ajaxError.bind(this));
      }

      return this.processQueue();
    }));

    return this._processingPromise;
  },

  actions: {
    addedFile (file) {
      this.setProperties({
        __dropzone:  this,
        __file:      file,
        fileIsAdded: true
      });

    },

    upload () {
      this.upload();
    },

    uploadedFile (dzfile, response) {
      this.__fileModel.setProperties(response.file);
      Dropzone.forElement(`#${this.dropzoneId}`).removeAllFiles(dzfile);

      this.__ajaxSuccess(null, true);

      if (this.uploadComplete) {
        let fileId = response.file._id;
        this.store.pushPayload('file', { file: [ response.file ] });
        this.uploadComplete(this.store.peekRecord('file', fileId));
      }
    },

    removeFile (file) {
      Dropzone.forElement(`#${this.dropzoneId}`).removeAllFiles(file);
      this.set('fileIsAdded', false);
    }
  }
});
