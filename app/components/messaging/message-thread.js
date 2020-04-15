import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { resolve } from 'rsvp';
import fileSupport from 'granite/mixins/file-handling';

const MessageThreadComponent = Component.extend(fileSupport, {
  socket: service(),
  auth:   service(),
  store:  service(),

  classNames: [ 'messaging__thread' ],

  fileData: {
    systemUse:      true,
    associatedData: { type: 'messagingAttachment' }
  },

  sendMessage () {
    resolve(this.fileIsAdded ? this.upload() : null)
    .then(file => {
      this.onMessage(this.message, file);
      this.set('message', null);
      this.send('removeFile');
    });
  },

  scrolledToTop () {
    this.onScrollback();
  },

  actions: {
    removeFile () {
      const $dropzone = Dropzone.forElement('.dropzone__messaging');

      if (!$dropzone || !this.fileIsAdded) {
        return;
      }

      $dropzone.removeFile(this.fileIsAdded);
      this.set('fileIsAdded', false);
    },

    didRemoveFile () {
      this.set('fileIsAdded', false);
    },

    uploadError (err) {
      this.rejectUpload(err);
    },

    // TODO: use uploadProgress
    uploadProgressUpdate (prog) {
      this.set('uploadProgress', prog);
    }
  }
});

MessageThreadComponent.reopenClass({ positionalParams: [ 'messages', 'thread' ] });

export default MessageThreadComponent;
