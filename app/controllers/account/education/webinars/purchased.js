import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class PurchasedController extends Controller {
  queryParams = [ 'idempotencyKey' ]

  get paymentMethod () {
    let { transaction } = this.model.data;

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
  }

  @action
  print () {
    window.print();
  }
}
