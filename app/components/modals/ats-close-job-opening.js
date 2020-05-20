import Component from '@glimmer/component';
import { elementId } from 'granite/core';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { Promise } from 'rsvp';
import { run } from '@ember/runloop';
import $ from 'jquery';

@elementId
export default class ModalsAtsCloseJobOpeningComponent extends Component {
  @tracked responded = false;

  constructor () {
    super(...arguments);
    if (this.confirmOnRender) {
      run.scheduleOnce('afterRender', () => this.createConfirm());
    }
  }

  get modalId () {
    return this.elementId + '-modal';
  }

  @action
  createConfirm () {
    this.responded = false;
    this._originalArgs = arguments;

    $('#' + this.modalId).modal({
      detachable: true,
      closable:   false,
      onHidden:   () => {
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
    let fn = this[response ? 'resolve' : 'reject'];
    fn.apply(null, this._originalArgs);
    this.responded = true;
    this.closeModal();

    // Bubble up the response to an action attr if available
    let onResponse = this.args.onResponse;

    if (onResponse && typeof onResponse === 'function') {
      onResponse(response);
    }
  }
}
