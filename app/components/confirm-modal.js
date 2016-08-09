import Ember from 'ember';

const { Component, RSVP: { Promise }, computed, run } = Ember;

export default Component.extend({
  responded: false,

  modalId: computed('elementId', function () {
    return this.get('elementId') + '-modal';
  }),

  didReceiveAttrs () {
    if ( this.get('confirmOnRender') ) {
      run.scheduleOnce('afterRender', () => this.get('startConfirmation')());
    }
  },

  createConfirm () {
    this.set('responded', false);

    Ember.$('#' + this.get('modalId')).modal({
      detachable: true,
      onHidden: () => {
        if ( !this.get('responded') ) {
          this.send('respond', false);
        }
      }
    }).modal('show');

    return new Promise((resolve, reject) => this.setProperties({ resolve, reject }));
  },

  startConfirmation: computed('modalId', function () {
    return this.createConfirm.bind(this);
  }),

  closeModal () {
    Ember.$('#' + this.get('modalId')).modal('hide');
  },

  actions: {
    respond ( response ) {
      this.get(response ? 'resolve' : 'reject')();
      this.set('responded', true);
      this.closeModal();

      // Bubble up the response to an action attr if available
      let onResponse = this.get('onResponse');

      if ( onResponse && typeof onResponse === 'function' ) {
        onResponse(response);
      }
    }
  }
});
