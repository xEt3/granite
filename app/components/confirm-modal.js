import Component from '@glimmer/component';
import { elementId } from 'granite/core';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { Promise } from 'rsvp';
import { run } from '@ember/runloop';
import $ from 'jquery';

@elementId
export default class ConfirmModalComponent extends Component {
  @tracked responded = false

  get modalId () {
    return this.elementId + '-modal';
  }

  constructor () {
    super(...arguments);
    if (this.confirmOnRender) {
      run.scheduleOnce('afterRender', () => this.createConfirm());
    }
  }

  @action
  createConfirm () {
    this.responded = false;
    this._originalArgs = arguments;

    $('#' + this.modalId).modal({
      context:    '.ember-application',
      detachable: true,
      onHidden:   () => {
        if (this.isDestroyed) {
          return;
        }
        if (!this.responded) {
          this.respond(false);
        }
      }
    }).modal('show');

    return new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }

  @action
  closeModal () {
    $('#' + this.modalId).modal('hide');
  }

  @action
  respond (response) {
    if (this.isDestroyed) {
      return;
    }
    let fn = this[response ? 'resolve' : 'reject'];
    fn.apply(null, response ? this._originalArgs : null);
    this.responded = true;
    this.closeModal();

    // Bubble up the response to an action attr if available
    let onResponse = this.args.onResponse;

    if (onResponse && typeof onResponse === 'function') {
      onResponse(response);
    }
  }
}
