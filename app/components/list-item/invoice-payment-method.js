import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import Component from '@ember/component';

@classic
export default class InvoicePaymentMethod extends Component {
  @computed('index')
  get highlightRow () {
    return this.index % 2 !== 0 ? true : false;
  }

  @computed('transaction.status')
  get isRejected () {
    return [ 'gateway_rejected', 'failed', 'settlement_declined', 'authorization_expired', 'processor_declined', 'voided' ].includes((this.transaction.status || '').toLowerCase());
  }

  @computed('transaction.paymentInstrumentType')
  get paymentMethod () {
    const {
      paymentInstrumentType: type,
      creditCard,
      paypal
    } = this.transaction || {};

    if ([ 'credit_card', 'paypal_account' ].indexOf(type) < 0) {
      return null;
    }

    let isPaypal = type === 'paypal_account';

    return {
      method: isPaypal ? paypal.payerEmail : creditCard.maskedNumber,
      image:  (isPaypal ? paypal : creditCard).imageUrl
    };
  }
}
