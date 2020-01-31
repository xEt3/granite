import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  highlightRow: computed('index', function () {
    return this.get('index') % 2 !== 0 ? true : false;
  }),

  isRejected: computed('transaction.status', function () {
    return [ 'gateway_rejected', 'failed', 'settlement_declined', 'authorization_expired', 'processor_declined', 'voided' ].includes((this.transaction.status || '').toLowerCase());
  }),

  paymentMethod: computed('transaction.paymentInstrumentType', function () {
    const {
      paymentInstrumentType: type,
      creditCard,
      paypal
    } = this.get('transaction') || {};

    if ([ 'credit_card', 'paypal_account' ].indexOf(type) < 0) {
      return null;
    }

    let isPaypal = type === 'paypal_account';

    return {
      method: isPaypal ? paypal.payerEmail : creditCard.maskedNumber,
      image:  (isPaypal ? paypal : creditCard).imageUrl
    };
  })
});
