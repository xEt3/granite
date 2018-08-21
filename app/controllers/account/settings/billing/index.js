import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import modalSupport from 'granite/mixins/modal-support';
import ajaxStatus from 'granite/mixins/ajax-status';

export default Controller.extend(modalSupport, ajaxStatus, {
  ajax: service(),
  subscription: service(),
  cancelDescription: 'Pushing this button will cancel your current subscription and you will lose access to your account until you reactivate.',

  statusClass: computed('model.status', function () {
    return this.get('model.status') === 'Active' ? 'text-green' : 'text-danger';
  }),

  actions : {
    getToken () {
      this.ajaxStart();
      this.get('ajax').request('/api/v1/bt/token')
      .then(token => {
        this.set('braintreeToken', token);
        this.ajaxSuccess(null, true);
      })
      .catch(this.ajaxError.bind(this));
    },

    savePaymentMethod (nonce) {
      if (!nonce) {
        return;
      }

      let paymentMethod = this.get('paymentMethod');
      paymentMethod.set('nonce', nonce);
      this.ajaxStart();

      return paymentMethod.save()
      .then(() => {
        this.send('refresh');
        this.ajaxSuccess('Payment method saved succesfully');
      })
      .catch(this.ajaxError.bind(this));
    },

    cancelSubscription () {
      let company = this.get('company');
      company.set('deactivatedOn', new Date());
      company.set('reactivatedOn', null);

      this.ajaxStart();

      return company.save()
      .then(() => {
        this.send('refresh');
        this.ajaxSuccess('Deactivated account', true);
      })
      .catch(this.ajaxError.bind(this));
    },

    activateSubscription () {
      let company = this.get('company');
      company.set('reactivatedOn', new Date());
      company.set('deactivatedOn', null);

      this.ajaxStart();

      return company.save()
      .then(() => {
        this.send('refresh');
        this.ajaxSuccess('Reactivated account', true);
      })
      .catch(this.ajaxError.bind(this));
    }
  }
});
