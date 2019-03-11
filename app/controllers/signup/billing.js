import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import ajaxStatus from 'granite/mixins/ajax-status';

export default Controller.extend(ajaxStatus, {
  ajax: service(),

  loadingPromo: computed.and('applyingPromo', 'working'),
  savingStep:   computed('applyingPromo', 'working', function () {
    return !this.get('applyingPromo') && this.get('working');
  }),

  actions: {
    async verifyDiscount () {
      const code = this.get('promoCode');

      if (!code) {
        return;
      }

      this.set('applyingPromo', true);
      this.ajaxStart();

      try {
        var validity = await this.ajax.request('/api/v1/bt/discount', { data: { code } });
      } catch (e) {
        return this.ajaxError(e, true);
      }

      if (!validity.code) {
        return this.ajaxError('Unable to apply discount.', true);
      }

      this.get('model').set('accountBillingPromo', validity.code);
      this.set('appliedPromo', validity);

      this.ajaxSuccess(null, true);
    },

    submit (nonce) {
      const model = this.get('model');

      this.ajaxStart();

      model.save()
      .then(company => {
        var paymentMethod = this.store.createRecord('payment-method', {
          nonce,
          company
        });
        return paymentMethod.save();
      })
      .then(() => {
        this.ajaxSuccess();
        this.transitionToRoute('signup.finish');
      })
      .catch(this.ajaxError.bind(this));
    }
  }
});
