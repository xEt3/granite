import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { resolve } from 'rsvp';

const MessageThreadComponent = Component.extend({
  socket: service(),
  auth: service(),

  fileEndpoint: '/api/v1/file',
  classNames: [ 'messaging__thread' ],

  sendMessage () {
    resolve(this.get('fileIsAdded') ? this.uploadFile() : null)
    .then(file => {
      this.get('onMessage')(this.get('message'), file);
      this.set('message', null);
      this.send('removeFile');
    });
  },

  scrolledToTop () {
    this.get('onScrollback')();
  },

  uploadFile () {
    return new Promise((resolveUpload, rejectUpload) => {
      this.setProperties({ resolveUpload, rejectUpload });
      Dropzone.forElement('.dropzone__messaging').processQueue();
    });
  },

  actions: {
    addedFile (file) {
      this.set('fileIsAdded', file);
    },

    removeFile () {
      const $dropzone = Dropzone.forElement('.dropzone__messaging');

      if (!$dropzone || !this.get('fileIsAdded')) {
        return;
      }

      $dropzone.removeFile(this.get('fileIsAdded'));
      this.set('fileIsAdded', false);
    },

    didRemoveFile () {
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
    }
  }
});

MessageThreadComponent.reopenClass({
  positionalParams: [ 'messages', 'thread' ]
});

export default MessageThreadComponent;
