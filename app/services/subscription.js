import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { once } from '@ember/runloop';
import { computed, observer } from '@ember/object';

export default Service.extend({
  ajax: service(),
  auth: service(),

  init () {
    this._super(...arguments);
    this.getSubscription();
  },

  company: computed('auth.user.company', function () {
    return this.get('auth.user.company');
  }),

  /* eslint-disable-next-line */
  updateSubscription: observer('auth.authenticated', 'auth.user.company', function () {
    once(this, this.getSubscription);
  }),

  isCancelled: computed('subscription.status', 'company.deactivatedOn', function () {
    return this.get('subscription.status') === 'Canceled' || this.get('company.deactivatedOn') ? true : false;
  }),

  accountSuspended: computed('subscription', 'subscription.daysPastDue', function () {
    return this.get('subscription.daysPastDue') > 14 ? true : false;
  }),

  accountLocked: computed('isCancelled', 'accountSuspended', function () {
    return this.get('isCancelled') || this.get('accountSuspended') ? true : false;
  }),

  daysLeftInGracePeriod: computed('subscription', 'subscription.daysPastDue', function () {
    let days = this.get('subscription.daysPastDue') < 15 ? this.get('subscription.daysPastDue') : null;

    if (!days) {
      return null;
    }

    let daysLeft = null;

    switch (days) {
    case 14:
      daysLeft = 'it is your last day';
      break;
    case 13:
      daysLeft = 'you have 1 day';
      break;
    default:
      daysLeft = `you have ${14 - days} days`;
    }

    return daysLeft;
  }),

  isActive: computed('subscription.status', function () {
    return this.get('subscription.status') === 'Active' ? true : false;
  }),

  inTrialPeriod: computed('subscription.firstBillingDate', function () {
    return new Date().getTime() < new Date(this.get('subscription.firstBillingDate')).getTime() ? true : false;
  }),

  paymentFailure: computed('subscription.failureCount', function () {
    return this.get('subscription.failureCount') > 0 ? true : false;
  }),

  activeEmployeeTotal: computed('subscription.addOns.[0].quantity', function () {
    let addOns = (this.get('subscription.addOns')[0] || {}).quantity;
    return addOns > 0 ? addOns + 5 : '5 or Less';
  }),

  latestTransaction: computed('subscription.transactions', function () {
    return this.get('subscription.transactions')[0];
  }),

  latestTransactionDescription: computed('subscription.latestTransaction', function () {
    let start = moment(this.get('latestTransaction.subscription.billingPeriodStartDate'));
    let end = moment(this.get('latestTransaction.subscription.billingPeriodEndDate'));
    let diff = end.diff(start, 'days');

    return diff < 28 ? 'proration charge' : 'monthly billing charge';
  }),

  currentPaymentMethod: computed('customer.paymentMethods.[]', 'subscription.paymentMethodToken', function () {
    let paymentMethods = this.get('customer.paymentMethods'),
        token = this.get('subscription.paymentMethodToken'),
        matchingPaymentMethod = null;

    paymentMethods.forEach(p => {
      if (p.token === token) {
        matchingPaymentMethod = p;
      }
    });

    return matchingPaymentMethod;
  }),

  cardExpiresSoon: computed('currentPaymentMethod', function () {
    if (!this.get('currentPaymentMethod.expirationDate')) {
      return false;
    }
    let expMonth = this.get('currentPaymentMethod.expirationMonth'),
        expYear = this.get('currentPaymentMethod.expirationYear'),
        currentMonth = moment(new Date()).format('MM'),
        currentYear = moment(new Date()).format('YYYY');

    return expMonth === currentMonth && expYear === currentYear ? true : false;
  }),

  getSubscription () {
    let company = this.get('auth.user.company.id');

    if (this.get('auth.authenticated') && company) {
      return this.get('ajax').request(`/api/v1/company/${company}/billing`)
      .then(response => {
        this.set('subscription', response.subscription);
        this.set('customer', response.customer);
        return response;
      });
    } else {
      this.set('subscription', null);
    }
  }
});
