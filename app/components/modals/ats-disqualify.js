import Component from '@ember/component';
import $ from 'jquery';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  auth: service(),

  disqualificationReasons: computed('auth.user.company', function () {
    return this.get('auth.user.company.disqualificationReasons');
  }),

  closeModal () {
    $('#' + this.get('modalId')).modal('hide');
  },

  actions: {
    respond (response) {
      this.get('onResponse')(response);
      this.closeModal();
    }
  }
});
