import Modal from '.';
import { action } from '@ember/object';
import $ from 'jquery';

export default class UpdatePaymentMethodModal extends Modal {
  modalId = 'modal_update-payment-method'

  @action
  closeModal () {
    $(`#${this.modalId}`).modal('hide');
  }
}
