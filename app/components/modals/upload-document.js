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
import FileHandler from 'granite/core/file-handler';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import $ from 'jquery';

export default class UploadDocumentModalComponent extends Component {
  @service() auth
  @service() store

  constructor () {
    super(...arguments);
    this.files = new FileHandler({ dropzoneId: this.dropzoneId });
  }

  get fileData () {
    return { systemUse: this.args.systemUse };
  }

  get elementId () {
    return Math.round(Math.random() * Math.pow(10, 10));
  }

  get modalId () {
    return `modal__file-upload-${this.elementId}`;
  }

  get dropzoneId () {
    return `input__dropzone--document-${this.elementId}`;
  }

  @action
  openModal () {
    $(`#${this.get('modalId')}`).modal({
      detachable: true,
      closable:   false
    }).modal('show');
  }

  @action
  closeModal () {
    this.send('removeFile');
    $(`#${this.get('modalId')}`).modal('hide');
  }
}
