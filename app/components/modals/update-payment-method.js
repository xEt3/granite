import Modal from '.';
import $ from 'jquery';

export default Modal.extend({
  modalId: 'modal_update-payment-method',

  actions: {
    closeModal () {
      $(`#${this.get('modalId')}`).modal('hide');
    }
  }
});
