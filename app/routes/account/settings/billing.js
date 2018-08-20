import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  ajax: service(),

  model () {
    let company = this.modelFor('account.settings');
    return {
      transactions: this.get('ajax').request(`/api/v1/company/${company.get('id')}/transactions`),
      company
    };
  }
});
