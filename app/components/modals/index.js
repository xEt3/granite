import Component from '@ember/component';
import $ from 'jquery';

export default Component.extend({
  modalId: '',

  actions: {
    respond (response) {
      const modalId = this.get('modalId');
      // Bubble response
      this.get('onResponse')(response);
      // Either way close the modal
      $(`#${modalId}`).modal('hide');
    }
  }
});
