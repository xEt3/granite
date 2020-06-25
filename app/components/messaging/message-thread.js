import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { resolve } from 'rsvp';
import { fileHandling } from 'granite/core';

@fileHandling
export default class MessagingMessageThreadComponent extends Component {
  @service socket
  @service auth
  @service store
  @service data
  @tracked message

  dropzoneId = 'dropzone__input--messaging'

  fileData = {
    systemUse:      true,
    associatedData: { type: 'messagingAttachment' }
  }

  @action
  async sendMessage () {
    let file = await resolve(this.files.fileIsAdded ? this.files.upload() : null);
    this.args.onMessage(this.message, file);
    this.message = null;
    this.files.removeFile();
  }

  @action
  scrolledToTop () {
    this.args.onScrollback();
  }

  @action
  uploadError (err) {
    this.rejectUpload(err);
  }

  // TODO: use uploadProgress
  uploadProgressUpdate (prog) {
    this.uploadProgress = prog;
  }
}
