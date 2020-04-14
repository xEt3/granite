import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

@classic
export default class InvoicesRoute extends Route {
  @service
  ajax;

  async model() {
    let company = this.modelFor('account.settings.billing');

    return {
      transactions: await this.get('ajax').request(`/api/v1/company/${company.get('id')}/transactions`),
      company
    };
  }

  setupController(controller, model) {
    controller.setProperties({
      model:   model.transactions.transactions,
      company: model.company
    });
  }
}
