import Component from '@ember/component';
import { computed } from '@ember/object';
import $ from 'jquery';

export default Component.extend({
  classNames: [ 'file-assignment-item' ],

  modalId: computed('', function () {
    return `modal__file-assignment-signature-${this.get('assignment.id')}`;
  }),

  actions: {
    openSignatureModal () {
      $(`#${this.get('modalId')}`).modal({ detachable: true }).modal('show');
    },

    closeSignatureModal () {
      $(`#${this.get('modalId')}`).modal('hide');
    }
  }
});
