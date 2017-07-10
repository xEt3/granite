import Modal from '.';

const SchedulerModalComponent = Modal.extend({
  modalId: 'modal__ats-scheduler'
});

SchedulerModalComponent.reopenClass({
  positionalParams: [ 'model', 'meeting' ]
});

export default SchedulerModalComponent;
