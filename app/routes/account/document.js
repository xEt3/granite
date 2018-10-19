import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend({
  title (tokens) {
    return tokens.join(' - ') + ' - ' + this.context.title + ' - Granite HR';
  },

  model (params) {
    return hash({
      document:  this.store.find('file', params.id),
      employees: this.store.findAll('employee')
    });
  },

  setupController (controller, model) {
    controller.setProperties({
      model:     model.document,
      employees: model.employees
    });
  }
});
