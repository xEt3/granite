import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { hash } from 'rsvp';

@classic
export default class DocumentRoute extends Route {
  title (tokens) {
    return tokens.join(' - ') + ' - ' + this.context.document.title + ' - Granite HR';
  }

  model (params) {
    return hash({
      document:  this.store.find('file', params.id),
      employees: this.store.findAll('employee')
    });
  }

  setupController (controller, model) {
    controller.setProperties({
      model:     model.document,
      employees: model.employees
    });
  }
}
