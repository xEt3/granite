/*
  USAGE

  <Modals::UploadDocument
    systemUse=true
    uploadComplete=(action 'uploadFollowup') as |openUploadModal|
  >
    <a href="#" {{on "click" (prevent-default openUploadModal)}}>
      <i class="upload icon"></i>
    </a>
  </Modals::UploadDocument>

  must pass in uploadComplete as function, param will be the file you uploaded --> uploadFollowup (file) {}

*/
import Component from '@glimmer/component';
import { elementId, fileHandling } from 'granite/core';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import $ from 'jquery';

@fileHandling
@elementId
export default class UploadDocumentModalComponent extends Component {
  @service auth
  @service data
  @service store

  get fileData () {
    return { systemUse: this.args.systemUse };
  }

  get modalId () {
    return `modal__file-upload-${this.elementId}`;
  }

  get dropzoneId () {
    return `input__dropzone--document-${this.elementId}`;
  }

  @action
  uploadComplete (arg) {
    this.args.uploadComplete(arg);
  }

  @action
  openModal () {
    $(`#${this.modalId}`).modal({
      detachable: true,
      closable:   false
    }).modal('show');
  }

  @action
  closeModal () {
    this.files.removeFile();
    $(`#${this.modalId}`).modal('hide');
  }
}
