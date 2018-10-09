import Component from '@ember/component';
import { computed } from '@ember/object';
import { time }  from 'granite/helpers/time';
import $ from 'jquery';

export default Component.extend({
  classNames: [ 'file-assignment-item' ],

  modalId: computed('', function () {
    return `modal__file-assignment-signature-${this.get('assignment.id')}`;
  }),

  viewedOn: computed('assignment.viewedOn', function () {
    return `Viewed on ${time([ this.get('assignment.readOn') ])}`;
  }),

  signedOn: computed('assignment.signature', function () {
    return `<h4 class="center aligned text">Signed on ${time([ this.get('assignment.signedOn') ])}</h4><img src=${this.get('assignment.signature')} class="ui medium image">`;
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
