import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend({
  model () {
    return hash({
      templates: this.store.query('template', {}),
      definitions: this.store.findAll('template-definition')
    });
  }
});
