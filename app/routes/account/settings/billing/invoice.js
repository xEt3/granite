import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default Route.extend({
  ajax: service(),

  model (params) {
    let { transactions } = this.modelFor('account.settings.billing');

    return hash({
      transactions,
      id: params.id
    });
  },

  setupController (controller, model) {
    model.transactions.transactions.forEach(t => {
      if (t.id === model.id) {
        this.set('transaction', t);
      }
    });
    controller.setProperties({
      model: this.get('transaction')
    });
  }
});
