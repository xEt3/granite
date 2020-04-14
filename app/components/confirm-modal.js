import classic from 'ember-classic-decorator';
import { action, computed } from '@ember/object';
import Component from '@ember/component';
import { Promise } from 'rsvp';
import { run } from '@ember/runloop';
import $ from 'jquery';

@classic
export default class ConfirmModal extends Component {
  responded = false;

  @computed('elementId')
  get modalId() {
    return this.get('elementId') + '-modal';
  }

  didReceiveAttrs() {
    if (this.get('confirmOnRender')) {
      run.scheduleOnce('afterRender', () => this.get('startConfirmation')());
    }
  }

  createConfirm() {
    this.setProperties({
      responded:     false,
      _originalArgs: arguments
    });

    $('#' + this.get('modalId')).modal({
      context:    '.ember-application',
      detachable: true,
      onHidden:   () => {
        if (this.get('isDestroyed')) {
          return;
        }
        if (!this.get('responded')) {
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
    $('#' + this.get('modalId')).modal('hide');
  }

  @action
  respond(response) {
    if (this.get('isDestroyed')) {
      return;
    }
    let fn = this.get(response ? 'resolve' : 'reject');
    fn.apply(null, response ? this.get('_originalArgs') : null);
    this.set('responded', true);
    this.closeModal();

    // Bubble up the response to an action attr if available
    let onResponse = this.get('onResponse');

    if (onResponse && typeof onResponse === 'function') {
      onResponse(response);
    }
  }
}
