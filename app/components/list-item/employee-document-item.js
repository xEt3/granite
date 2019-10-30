import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';
import del from 'granite/mixins/controller-abstractions/delete';
import $ from 'jquery';
import moment from 'moment';

export default Component.extend(addEdit, del, {
  classNames:   [ 'item' ],
  tagName:      'div',
  imagePreview: computed.match('assignment.file.extension', /je?pg|png|gif/i),
  file:         computed('assignment.file', function () {
    return this.get('assignment.file');
  }),

  modalId: computed('', function () {
    return `modal__file-assignment-signature-${this.get('assignment.id')}`;
  }),

  signature: computed('assignment.signature', function () {
    return htmlSafe(`<img src=${this.get('assignment.signature')} class="ui medium image">`);
  }),

  pastAssignment: computed('assignment.effectiveOn', function () {
    return !this.get('assignment.effectiveOn') ? true : moment(this.get('assignment.effectiveOn')).isBefore(moment());
  }),

  actions: {
    openModal () {
      $(`#${this.get('modalId')}`).modal({ detachable: true }).modal('show');
    },

    closeModal () {
      $(`#${this.get('modalId')}`).modal('hide');
    },

    uploadFollowup (file) {
      let assignment = this.get('assignment');
      assignment.get('followups').pushObject(file);
      this.saveModel(assignment);
    },

    notify (type, msg) {
      this.get('onNotify')(type, msg);
    }
  }
});
