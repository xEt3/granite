import Modal from '.';

const ResponsesModalComponent = Modal.extend({
  modalId: 'modal__ats-scheduler'
});

ResponsesModalComponent.reopenClass({
  positionalParams: [ 'jobApplication', 'jobOpening' ]
});

export default ResponsesModalComponent;
