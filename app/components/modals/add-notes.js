import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import ajaxStatus from 'granite/mixins/ajax-status';
import $ from 'jquery';

export default Component.extend(ajaxStatus, {
  store:        service(),
  enableNotify: false,

  modalId: computed('elementId', function () {
    return this.get('elementId') + '-modal';
  }),

  openModal () {
    $('#' + this.get('modalId')).modal({
      detachable: true,
      closable:   false,
      context:    '.ember-application'
    }).modal('show');
  },

  closeModal () {
    $('#' + this.get('modalId')).modal('hide');
  },

  openModalAction: computed('modalId', function () {
    return this.openModal.bind(this);
  }),

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