import Controller from '@ember/controller';
import { action } from '@ember/object';
import moment from 'moment';

export default class InvoiceController extends Controller {
  get isSubscription () {
    return !(this.model.customFields || {}).transactionType && this.model.subscriptionId;
  }

  get isProrateCharge () {
    const {
      billingPeriodStartDate,
      billingPeriodEndDate
    } = this.model.subscription || {};

    return moment(billingPeriodEndDate).diff(billingPeriodStartDate, 'days') < 28;
  }

  get paymentMethod () {
    const {
      creditCard,
      paymentInstrumentType,
      paypal
    } = this.model;

    switch (paymentInstrumentType) {
    case 'credit_card':
      return {
        method: creditCard.maskedNumber,
        image:  creditCard.imageUrl
      };
    case 'paypal_account':
      return {
        method: paypal.payerEmail,
        image:  paypal.imageUrl
      };
    default:
      return null;
    }
  }

  @action
  printTransaction () {
    window.print();
  }
}
