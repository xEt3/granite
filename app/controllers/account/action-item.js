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

    cancelActionItem () {
      this.set('model.cancelledOn', new Date());
      this.send('save');
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

    selectDelay () {
      this.set('respondedDelay', false);

      Ember.$('#modal__action-item--delay').modal({
        detachable: true,
        onHidden: () => {
          if ( !this.get('respondedDelay') ) {
            this.send('respondDelayModal', false);
          }
        }
      }).modal('show');

      return new Promise((resolveDelay, rejectDelay) => this.setProperties({ resolveDelay, rejectDelay }));
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
    },

    respondDelayModal ( response ) {
      this.get(response ? 'resolveDelay' : 'rejectDelay')();

      if ( !response ) {
        this.set('model.delayedUntil', null);
      }

      this.set('respondedDelay', true);
      Ember.$('#modal__action-item--delay').modal('hide');
    }
  }
});
