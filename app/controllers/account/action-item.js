import Ember from 'ember';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';
import del from 'granite/mixins/controller-abstractions/delete';

const { Controller, RSVP: { Promise } } = Ember;

export default Controller.extend(del, addEdit, {
  transitionAfterDelete: 'account.action-items',
  transitionWithModel: false,

  actions: {
    toggleComplete () {
      if ( this.get('model.completedOn') ) {
        this.set('model.completedOn', null);
      } else {
        this.set('model.completedOn', new Date());
      }
    },

    transfer ( target ) {
      this.set('model.owner', target);
    },

    confirmCompletion () {
      this.set('respondedComplete', false);

      Ember.$('#modal__action-item--confirm-complete').modal({
        detachable: true,
        onHidden: () => {
          if ( !this.get('respondedComplete') ) {
            this.send('respondConfirmCompleteModal', false);
          }
        }
      }).modal('show');

      return new Promise((resolveComplete, rejectComplete) => this.setProperties({ resolveComplete, rejectComplete }));
    },

    selectTransferTarget () {
      this.set('respondedTransfer', false);

      Ember.$('#modal__action-item--transfer').modal({
        detachable: true,
        onHidden: () => {
          if ( !this.get('respondedTransfer') ) {
            this.send('respondTransferModal', false);
          }
        }
      }).modal('show');

      return new Promise((resolveTransfer, rejectTransfer) => this.setProperties({ resolveTransfer, rejectTransfer }));
    },

    respondTransferModal ( response ) {
      this.get(response ? 'resolveTransfer' : 'rejectTransfer')(response ? this.get('transferTarget') : null);
      this.set('respondedTransfer', true);
      Ember.$('#modal__action-item--transfer').modal('hide');
    },

    respondConfirmCompleteModal ( response ) {
      this.get(response ? 'resolveComplete' : 'rejectComplete')(response);
      this.set('respondedComplete', true);
      Ember.$('#modal__action-item--confirm-complete').modal('hide');
    }
  }
});
