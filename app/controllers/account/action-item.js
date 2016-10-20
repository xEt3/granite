import Ember from 'ember';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';
import del from 'granite/mixins/controller-abstractions/delete';

const { Controller, RSVP: { Promise } } = Ember;

export default Controller.extend(del, addEdit, {
  transitionAfterDelete: 'account.action-items',
  transitionWithModel: false,

  actions: {
    markComplete () {
      console.log('called markComplete');
      this.set('model.completedOn', new Date());
    },

    transfer ( target ) {
      console.log('called transfer');
      this.set('model.owner', target);
    },

    confirmCompletion () {
      console.log('called confirmCompletion');
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
      console.log('called selectTransferTarget');
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
      console.log('called respondTransferModal');
      this.get(response ? 'resolveTransfer' : 'rejectTransfer')(response ? this.get('transferTarget') : null);
      this.set('respondedTransfer', true);
      Ember.$('#modal__action-item--transfer').modal('hide');
    },

    respondConfirmCompleteModal ( response ) {
      console.log('called respondConfirmCompleteModal');
      this.get(response ? 'resolveComplete' : 'rejectComplete')(response ? this.get('transfComplete') : null);
      this.set('respondedComplete', true);
      Ember.$('#modal__action-item--confirm-complete').modal('hide');
    }
  }
});
