import classic from 'ember-classic-decorator';
import { action, computed } from '@ember/object';
import Component from '@ember/component';
import { Promise } from 'rsvp';
import { run } from '@ember/runloop';
import $ from 'jquery';

@classic
export default class AtsCloseJobOpening extends Component {
  responded = false;

  @computed('elementId')
  get modalId() {
    return this.elementId + '-modal';
  }

  didReceiveAttrs() {
    if (this.confirmOnRender) {
      run.scheduleOnce('afterRender', () => this.startConfirmation());
    }
  }

  createConfirm() {
    this.setProperties({
      responded:     false,
      _originalArgs: arguments
    });

    $('#' + this.modalId).modal({
      detachable: true,
      closable:   false,
      onHidden:   () => {
        if (!this.responded) {
          this.send('respond', false);
        }
      }
    }).modal('show');

    return new Promise((resolve, reject) => this.setProperties({
      resolve,
      reject
    }));
  }

  @computed('modalId')
  get startConfirmation() {
    return this.createConfirm.bind(this);
  }

  closeModal() {
    $('#' + this.modalId).modal('hide');
  }

  @action
  respond(response) {
    let fn = this.get(response ? 'resolve' : 'reject');
    fn.apply(null, this._originalArgs);
    this.set('responded', true);
    this.closeModal();

    // Bubble up the response to an action attr if available
    let onResponse = this.onResponse;

    if (onResponse && typeof onResponse === 'function') {
      onResponse(response);
    }
  }
}
