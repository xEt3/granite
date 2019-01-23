/*
  USAGE

  {{#modals/upload-document
    systemUse=true
    uploadComplete=(action 'uploadFollowup') as |openUploadModal|
  }}
    {{#ui-popup content="Upload a followup document" class="right floated"}}
      <a href="#" {{action openUploadModal}}>
        <i class="upload icon"></i>
      </a>
    {{/ui-popup}}
  {{/modals/upload-document}}

  must pass in uploadComplete as function, param will be the file you uploaded --> uploadFollowup (file) {}

*/
import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import fileSupport from 'granite/mixins/file-handling';
import $ from 'jquery';

export default Component.extend(fileSupport, {
  auth:  service(),
  store: service(),

  tagName: [ 'span' ],

  fileData: computed('systemUse', function () {
    return { systemUse: this.get('systemUse') };
  }),

  startApplication: computed('modalId', function () {
    return this.openModal.bind(this);
  }),

  modalId: computed('', function () {
    return `modal__file-upload-${this.get('elementId')}`;
  }),

  dropzoneId: computed('elementId', function () {
    return `input__dropzone--document-${this.elementId}`;
  }),

  openModal () {
    $(`#${this.get('modalId')}`).modal({
      detachable: true,
      closable:   false
    }).modal('show');
  },

  closeModal () {
    this.send('removeFile');
    $(`#${this.get('modalId')}`).modal('hide');
  }
});
