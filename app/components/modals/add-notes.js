import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import ajaxStatus from 'granite/mixins/ajax-status';
import Modal from '.';
import $ from 'jquery';

export default Modal.extend(ajaxStatus, {
  store:        service(),
  enableNotify: false,

  modalId: computed('elementId', function () {
    return this.get('elementId') + '-modal';
  }),

  closeModal () {
    $('#' + this.get('modalId')).modal('hide');
  },

  actions: {
    cancel () {
      this.get('model').rollbackAttributes();
      this.closeModal();
    },

    save () {
      let application = this.get('model');
      this.ajaxStart();

      application.save()
      .then(() => {
        this.ajaxSuccess('Saved notes');
        this.closeModal();
      });
    }
  }
});
