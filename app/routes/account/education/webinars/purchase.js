import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class PurchaseRoute extends Route {
  @service ajax
  @service data
  @service transactions

  backToWebinars () {
    this.transitionTo('account.education.webinars.index');
  }

  async model (params) {
    const { idempotencyKey } = params;
    if (!idempotencyKey) {
      return this.backToWebinars();
    }

    const intent = this.transactions.getIntent(idempotencyKey);

    if (!intent || intent.data.type !== 'webinarPurchase') {
      return this.backToWebinars();
    }

    // Intentional - not awaiting an async function. This allows the
    // page to render and display loading UI
    this.processTransaction(intent);
  }

  async processTransaction (intent) {
    const { success, error } = this.data.createStatus('webinarPurchase');

    try {
      await this.ajax.post('/api/v1/webinar/purchase', { data: { ids: intent.data.webinarIds } });
    } catch (err) {
      error(err);
      return this.backToWebinars();
    }

    success('Successfully processed transaction.');
    this.transitionTo('account.education.webinars.completed', { queryParams: { idempotencyKey: intent.idempotencyKey } });
  }
}
