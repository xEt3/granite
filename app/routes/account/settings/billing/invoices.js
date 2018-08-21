import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default Route.extend({
  ajax: service(),

  model () {
    let { company, transactions } = this.modelFor('account.settings.billing');

    return hash({
      transactions,
      company
    });
  },

  setupController (controller, model) {
    controller.setProperties({
      model: model.transactions.transactions,
      company: model.company
    });
  }
});
