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
    resolve(this.get('fileIsAdded') ? this.upload() : null)
    .then(file => {
      this.get('onMessage')(this.get('message'), file);
      this.set('message', null);
      this.send('removeFile');
    });
  },

  scrolledToTop () {
    this.get('onScrollback')();
  },

  actions: {
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

    // TODO: use uploadProgress
    uploadProgressUpdate (prog) {
      this.set('uploadProgress', prog);
    }
  }
});

MessageThreadComponent.reopenClass({ positionalParams: [ 'messages', 'thread' ] });

export default MessageThreadComponent;
