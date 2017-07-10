import Modal from '.';

const ConfirmModalComponent = Modal.extend({
  modalId: 'modal__ats-confirm-disqualify'
});

ConfirmModalComponent.reopenClass({
  positionalParams: [ 'model' ]
});

export default ConfirmModalComponent;
