import Component from '@ember/component';
import { computed } from '@ember/object';
import $ from 'jquery';

export default Component.extend({
  modalId: '',

  openModalFn: computed('modalId', function () {
    return (this.openModal || this.dispatchSemanticModal).bind(this);
  }),

  dispatchSemanticModal () {
    this.getModalById().modal({
      detachable: true,
      closable:   false,
      onHidden:   () => {
        if (this.isDestroyed || this.isDestroying) {
          return this.getModalById().remove();
        }

        this.getModalById().appendTo(this.element);
      },
      context: '.ember-application'
    }).modal('show');
  },

  willDestroy () {
    const $modal = this.getModalById();
    $modal.modal('hide');
    $modal.remove();
  },

  getModalById () {
    return $(`#${this.modalId}`);
  },

  actions: {
    respond (response) {
      const modalId = this.get('modalId');
      // Bubble response
      let ret = this.onResponse?.(response);
      // Either way close the modal
      if (ret && ret.finally) {
        return ret.finally(() => {
          $(`#${modalId}`).modal('hide');
        });
      }

      $(`#${modalId}`).modal('hide');
    }
  }
});
