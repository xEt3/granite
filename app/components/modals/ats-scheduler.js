import Modal from '.';

const SchedulerModalComponent = Modal.extend({
  modalId: 'modal__ats-scheduler'
});

SchedulerModalComponent.reopenClass({
  positionalParams: [ 'model' ]
});

export default SchedulerModalComponent;
