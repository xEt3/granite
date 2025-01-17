import Route from 'granite/core/route';
import { inject as service } from '@ember/service';

export default class InvoicesRoute extends Route {
  @service ajax;

  async model () {
    let company = this.modelFor('account.settings.billing');

    return {
      transactions: await this.ajax.request(`/api/v1/company/${company.get('id')}/transactions`),
      company
    };
  }

  setupController (controller, model) {
    controller.setProperties({
      model:   model.transactions.transactions,
      company: model.company
    });
  }
}
