import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class PurchasedRoute extends Route {
  @service transactions

  backToWebinars () {
    this.transitionTo('account.education.webinars.index');
  }

  async model (params) {
    const { idempotencyKey } = params;

    if (!idempotencyKey) {
      return this.backToWebinars();
    }

    const intent = this.transactions.getIntent(idempotencyKey, true);

    if (!intent || intent.data.type !== 'webinarPurchase') {
      return this.backToWebinars();
    }

    return intent;
  }
}
