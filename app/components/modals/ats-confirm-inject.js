import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  modalId: 'modal__ats-confirm-inject',

  actions: {
    respond (response) {
      const modalId = this.get('modalId');
      // Bubble response
      this.get('onResponse')(response);
      // Either way close the modal
      Ember.$(`#${modalId}`).modal('hide');
    }
  }
});
