import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';
import refreshable from 'granite/mixins/refreshable';

export default Route.extend(refreshable, {
  ajax: service(),
  auth: service(),
  subscription: service(),

  model () {
    let company = this.get('auth.user.company');

    return hash({
      company,
      paymentMethod: this.store.queryRecord('payment-method', {
        company: company.get('id')
      }),
      subscriptionInfo: this.subscription.getSubscription()
    });
  },

  setupController (controller, model) {
    controller.setProperties({
      model: model.subscriptionInfo.subscription,
      customer: model.subscriptionInfo.customer,
      paymentMethod: model.paymentMethod,
      company: model.company
    });
  },

  actions: {
    willTransition (transition) {
      if (this.get('subscription.accountLocked') && transition.targetName !== 'account.settings.billing.index' && transition.targetName !== 'index') {
        transition.abort();
      }
    }
  }
});
