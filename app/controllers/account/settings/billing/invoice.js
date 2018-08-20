import Controller from '@ember/controller';
import { computed } from '@ember/object';
import moment from 'moment';

export default Controller.extend({
  isProrateCharge: computed('model.subscription.{billingPeriodStartDate,billingPeriodEndDate}', function () {
    let start = moment(this.get('model.subscription.billingPeriodStartDate')),
        end = moment(this.get('model.subscription.billingPeriodEndDate')),
        diff = end.diff(start, 'days');

    return diff < 28 ? true : false;
  }),

  paymentMethod: computed('model.paymentInstrumentType', function () {
    let transaction = this.get('model');
    if (transaction.paymentInstrumentType === 'credit_card') {
      return {
        method: transaction.creditCard.maskedNumber,
        image:  transaction.creditCard.imageUrl
      };
    } else if (transaction.paymentInstrumentType === 'paypal_account') {
      return {
        method: transaction.paypal.payerEmail,
        image:  transaction.paypal.imageUrl
      };
    } else {
      return null;
    }
  }),

  actions: {
    printTransaction () {
      window.print();
    }
  }
});
