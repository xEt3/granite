import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import fileSupport from 'granite/mixins/file-handling';
import $ from 'jquery';

export default Component.extend(fileSupport, {
  auth:  service(),
  store: service(),

  tagName: [ 'span' ],

  fileData: {
    systemUse:      true,
    associatedData: { type: 'followup' }
  },

  startApplication: computed('modalId', function () {
    return this.openModal.bind(this);
  }),

  modalId: computed('', function () {
    return `modal__file-upload-${this.get('assignment.id')}`;
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
