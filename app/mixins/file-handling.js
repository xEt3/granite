/*
  This mixin adds file handling capabilities, for use on a controller
 */

import Ember from 'ember';

const { Mixin, computed, run } = Ember;

export default Mixin.create({
  /* Make a preflight request to create a file before upload. Use this if you are
  using the file api as-is, without additional middleware. */
  filePreflight: true,
  /* Base endpoint path for post preflight request - replaces fileEndpoint var with
  parsed endpoint */
  fileBaseEndpoint: '/api/v1/file/:id',

  // initialize
  fileIsAdded: false,
  dropzoneId: 'dropzone', // use your own!

  fileEndpoint: computed('fileBaseEndpoint', 'filePreflightIdentifier', function () {
    const fileBaseEndpoint = this.get('fileBaseEndpoint'),
          preflightId = this.get('filePreflightIdentifier');
    console.log('recalc file endpoint', fileBaseEndpoint, preflightId);
    console.log(fileBaseEndpoint.replace(':id', preflightId));
    return fileBaseEndpoint.replace(':id', preflightId);
  }),

  __ajaxStart () {
    if (this.ajaxStart) {
      this.ajaxStart(...arguments);
    }
  },

  __ajaxSuccess () {
    if (this.ajaxSuccess) {
      this.ajaxSuccess(...arguments);
    }
  },

  __ajaxError () {
    if (this.ajaxError) {
      this.ajaxError(...arguments);
    }
  },

  __doPreflight () {
    const fileData = this.get('fileData');
    console.log(Dropzone.options);
    return;

    return this.store.createRecord('file', fileData)
    .save()
    .then((file = {}) => {
      console.log('file?', file, file.get('id'));
      if (file && file.get('id')) {
        this.set('filePreflightIdentifier', file.get('id'));
      }

      return file;
    });
  },

  processQueue () {
    return Dropzone.forElement(`#${this.get('dropzoneId')}`).processQueue();
  },

  upload () {
    this.__ajaxStart();

    // do a preflight request
    if (this.get('filePreflight')) {
      return this.__doPreflight()
      .then(() =>
        run.later(() => {
          console.log('processing');
          this.processQueue();
        }, 5000))
      .catch(this.__ajaxError.bind(this));
    }

    return this.processQueue();
  },

  actions: {
    addedFile (file) {
      this.setProperties({
        __dropzone: this,
        __file: file,
        fileIsAdded: true
      });
    },

    upload () {
      this.upload();
    },

    uploadedFile () {
      this.__ajaxSuccess(null, true);
      if (this.uploadComplete) {
        this.uploadComplete();
      }
    },

    removeFile (file) {
      Dropzone.forElement(`#${this.get('dropzoneId')}`).removeAllFiles(file);
      this.set('fileIsAdded', false);
    }
  }
});
