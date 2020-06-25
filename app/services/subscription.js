import classic from 'ember-classic-decorator';
import { observes } from '@ember-decorators/object';
import { computed } from '@ember/object';
import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { once } from '@ember/runloop';

@classic
export default class SubscriptionService extends Service {
  @service ajax;

  @service auth;

  init () {
    super.init(...arguments);
    this.getSubscription();
  }

  @computed('auth.user.company')
  get company () {
    return this.get('auth.user.company');
  }

  /* eslint-disable-next-line */
  @observes('auth.authenticated', 'auth.user.company')
  updateSubscription () {
    once(this, this.getSubscription);
  }

  @computed('subscription.status', 'company.deactivatedOn')
  get isCancelled () {
    return this.get('subscription.status') === 'Canceled' || this.get('company.deactivatedOn') ? true : false;
  }

  @computed('subscription', 'subscription.daysPastDue')
  get accountSuspended () {
    return this.get('subscription.daysPastDue') > 14 ? true : false;
  }

  @computed('isCancelled', 'accountSuspended')
  get accountLocked () {
    return this.isCancelled || this.accountSuspended ? true : false;
  }

  @computed('subscription', 'subscription.daysPastDue')
  get daysLeftInGracePeriod () {
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
  }

  @computed('subscription.status')
  get isActive () {
    return this.get('subscription.status') === 'Active' ? true : false;
  }

  @computed('subscription.firstBillingDate')
  get inTrialPeriod () {
    return new Date().getTime() < new Date(this.get('subscription.firstBillingDate')).getTime() ? true : false;
  }

  @computed('subscription.failureCount')
  get paymentFailure () {
    return this.get('subscription.failureCount') > 0 ? true : false;
  }

  @computed('subscription.addOns.[0].quantity')
  get activeEmployeeTotal () {
    let addOns = (this.get('subscription.addOns')[0] || {}).quantity;
    return addOns > 0 ? addOns + 5 : '5 or Less';
  }

  @computed('subscription.transactions')
  get latestTransaction () {
    return this.get('subscription.transactions')[0];
  }

  @computed('subscription.latestTransaction')
  get latestTransactionDescription () {
    let start = moment(this.get('latestTransaction.subscription.billingPeriodStartDate'));
    let end = moment(this.get('latestTransaction.subscription.billingPeriodEndDate'));
    let diff = end.diff(start, 'days');

    return diff < 28 ? 'proration charge' : 'monthly billing charge';
  }

  @computed('customer.paymentMethods.[]', 'subscription.paymentMethodToken')
  get currentPaymentMethod () {
    let paymentMethods = this.get('customer.paymentMethods'),
        token = this.get('subscription.paymentMethodToken'),
        matchingPaymentMethod = null;

    paymentMethods.forEach(p => {
      if (p.token === token) {
        matchingPaymentMethod = p;
      }
    });

    return matchingPaymentMethod;
  }

  @computed('currentPaymentMethod')
  get cardExpiresSoon () {
    if (!this.get('currentPaymentMethod.expirationDate')) {
      return false;
    }
    let expMonth = this.get('currentPaymentMethod.expirationMonth'),
        expYear = this.get('currentPaymentMethod.expirationYear'),
        currentMonth = moment(new Date()).format('MM'),
        currentYear = moment(new Date()).format('YYYY');

    return expMonth === currentMonth && expYear === currentYear ? true : false;
  }

  getSubscription () {
    let company = this.get('auth.user.company.id');

    if (this.get('auth.authenticated') && company) {
      return this.ajax.request(`/api/v1/company/${company}/billing`)
      .then(response => {
        this.set('subscription', response.subscription);
        this.set('customer', response.customer);
        return response;
      });
    } else {
      this.set('subscription', null);
    }
  }
}
