import Modal from '.';
import { computed } from '@ember/object';
import $ from 'jquery';

export default Modal.extend({
  modalId: 'modal__view-form-response',

  openModalCb: computed('modalId', function () {
    return this.openModal.bind(this);
  }),

  responses: computed('response.responses.[]', 'form.elements.[]', function () {
    return this.form?.elements && this.form.elements.map(element => {
      return {
        question: element.label,
        response: this.get('response.responses').findBy('step', element.id)
      };
    });
  }),

  openModal (response, form) {
    this.setProperties({
      response,
      form
    });

    $(`#${this.get('modalId')}`).modal({
      detachable: true,
      closable:   false,
      context:    '.ember-application'
    }).modal('show');
  },

  closeModal () {
    if (this.form.isNew) {
      this.form.deleteRecord();
      this.set('form', null);
    }

    $(`#${this.get('modalId')}`).modal('hide');
  }
});
