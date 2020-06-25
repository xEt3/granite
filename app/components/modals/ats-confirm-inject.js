import Modal from '.';

export default class AtsConfirmInjectModal extends Modal {
  modalId = 'modal__ats-confirm-inject'
  onResponse = this.args.onResponse
}
