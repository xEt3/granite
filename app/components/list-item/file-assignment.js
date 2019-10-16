import Component from '@ember/component';
import { computed } from '@ember/object';
import $ from 'jquery';
import moment from 'moment';

export default Component.extend({
  classNames: [ 'file-assignment-item' ],

  modalId: computed('', function () {
    return `modal__file-assignment-signature-${this.get('assignment.id')}`;
  }),

  pastAssignment: computed('assignment.effectiveOn', function () {
    return !this.get('assignment.effectiveOn') ? true : moment(this.get('assignment.effectiveOn')).isBefore(moment());
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
