import Route from 'granite/core/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { hash } from 'rsvp';

export default class BillingRoute extends Route {
  @service subscription

  model () {
    const company = this.auth.user.get('company');

    return hash({
      company,
      paymentMethod:    this.store.queryRecord('payment-method', { company: company.get('id') }),
      subscriptionInfo: this.subscription.getSubscription()
    });
  }

  setupController (controller, model) {
    controller.setProperties({
      model:         model.subscriptionInfo.subscription,
      customer:      model.subscriptionInfo.customer,
      paymentMethod: model.paymentMethod,
      company:       model.company
    });
  }

  @action
  willTransition (transition) {
    if (this.subscription.accountLocked && transition.targetName !== 'account.settings.billing.index' && transition.targetName !== 'index') {
      transition.abort();
    }
  }
}
