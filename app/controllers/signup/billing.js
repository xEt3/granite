import Ember from 'ember';
import ajaxStatus from 'granite/mixins/ajax-status';

const { Controller } = Ember;

export default Controller.extend(ajaxStatus, {
  actions: {
    createPaymentMethod ( nonce ) {
      this.ajaxStart();
    }
  }
});
