import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend({
  titleToken: 'Templates',

  model () {
    return hash({
      templates: this.store.query('template', {}),
      definitions: this.store.findAll('template-definition')
    });
  }
});
