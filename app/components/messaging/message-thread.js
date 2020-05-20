import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { resolve } from 'rsvp';
import { fileHandling } from 'granite/core';

@fileHandling
export default class MessagingMessageThreadComponent extends Component {
  @service socket
  @service auth
  @service store

  fileData = {
    systemUse:      true,
    associatedData: { type: 'messagingAttachment' }
  }

  @action
  async sendMessage () {
    let file = await resolve(this.files.fileIsAdded ? this.files.upload() : null);
    this.onMessage(this.message, file);
    this.message = null;
    this.removeFile();
  }

  @action
  scrolledToTop () {
    this.onScrollback();
  }

  // @action
  // removeFile () {
  //   const $dropzone = Dropzone.forElement('.dropzone__messaging');
  //
  //   if (!$dropzone || !this.fileIsAdded) {
  //     return;
  //   }
  //
  //   $dropzone.removeFile(this.fileIsAdded);
  //   this.fileIsAdded = false;
  // },

  // didRemoveFile () {
  //   this.set('fileIsAdded', false);
  // }

  @action
  uploadError (err) {
    this.rejectUpload(err);
  }

  // TODO: use uploadProgress
  uploadProgressUpdate (prog) {
    this.uploadProgress = prog;
  }
}
