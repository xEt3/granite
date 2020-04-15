import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class InvoiceRoute extends Route {
  @service ajax

  async model (params) {
    const company = this.modelFor('account.settings');
    return await this.ajax.request(`/api/v1/company/${company.id}/transaction/${params.id}`);
  }

  setupController (controller, model) {
    controller.set('model', model.transaction);
  }
}
