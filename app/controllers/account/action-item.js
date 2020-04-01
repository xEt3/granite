import Controller from 'granite/core/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { Promise } from 'rsvp';
import $ from 'jquery';

export default class AccountActionItemController extends Controller {
  @service data
  afterSaveOptions = {
    transitionAfterDelete: 'account.action-items',
    transitionWithModel:   false
  }

  @action save () {
    this.data.saveRecord(this.model, 'working', this.afterSaveOptions);
  }

  @action
  toggleComplete () {
    if (this.get('model.completedOn')) {
      this.set('model.completedOn', null);
    } else {
      this.set('model.completedOn', new Date());
    }
  }

  @action
  transfer (target) {
    this.set('model.owner', target);
  }

  @action
  cancelActionItem () {
    this.set('model.cancelledOn', new Date());
  }

  @action
  confirmCompletion () {
    this.set('respondedComplete', false);

    $('#modal__action-item--confirm-complete').modal({
      detachable: true,
      onHidden:   () => {
        if (!this.get('respondedComplete')) {
          this.send('respondConfirmCompleteModal', false);
        }
      }
    }).modal('show');

    return new Promise((resolveComplete, rejectComplete) => this.setProperties({
      resolveComplete,
      rejectComplete
    }));
  }

  @action
  selectTransferTarget () {
    this.set('respondedTransfer', false);

    $('#modal__action-item--transfer').modal({
      detachable: true,
      onHidden:   () => {
        if (!this.get('respondedTransfer')) {
          this.send('respondTransferModal', false);
        }
      }
    }).modal('show');

    return new Promise((resolveTransfer, rejectTransfer) => this.setProperties({
      resolveTransfer,
      rejectTransfer
    }));
  }

  @action
  selectDelay () {
    this.set('respondedDelay', false);

    $('#modal__action-item--delay').modal({
      detachable: true,
      onHidden:   () => {
        if (!this.get('respondedDelay')) {
          this.send('respondDelayModal', false);
        }
      }
    }).modal('show');

    return new Promise((resolveDelay, rejectDelay) => this.setProperties({
      resolveDelay,
      rejectDelay
    }));
  }

  @action
  respondTransferModal (response) {
    this.get(response ? 'resolveTransfer' : 'rejectTransfer')(response ? this.get('transferTarget') : null);
    this.set('respondedTransfer', true);
    $('#modal__action-item--transfer').modal('hide');
  }

  @action
  respondConfirmCompleteModal (response) {
    this.get(response ? 'resolveComplete' : 'rejectComplete')(response);
    this.set('respondedComplete', true);
    $('#modal__action-item--confirm-complete').modal('hide');
  }

  @action
  respondDelayModal (response) {
    this.get(response ? 'resolveDelay' : 'rejectDelay')();

    if (!response) {
      this.set('model.delayedUntil', null);
    }

    this.set('respondedDelay', true);
    $('#modal__action-item--delay').modal('hide');
  }
}
