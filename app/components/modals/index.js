import Component from '@ember/component';
import $ from 'jquery';

export default Component.extend({
  modalId: '',

  actions: {
    respond (response) {
      const modalId = this.get('modalId');
      // Bubble response
      let ret = this.get('onResponse')(response);
      // Either way close the modal
      if (ret.finally) {
        return ret.finally(() => {
          $(`#${modalId}`).modal('hide');
        });
      }

      $(`#${modalId}`).modal('hide');
    }
  }
});
