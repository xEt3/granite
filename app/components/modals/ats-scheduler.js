import Modal from './';

const SchedulerModalComponent = Modal.extend({
  modalId: 'modal__ats-scheduler'
});

SchedulerModalComponent.reopenClass({
  positionParams: [ 'model' ]
});

export default SchedulerModalComponent;
