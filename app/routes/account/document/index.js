import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend({
  model () {
    return hash({
      document: this.modelFor('account.document'),
      employees: this.store.findAll('employee')
    });
  },

  setupController (controller, model) {
    controller.setProperties({
      model: model.document,
      employees: model.employees
    });
  }
});
