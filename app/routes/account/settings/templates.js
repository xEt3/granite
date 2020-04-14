import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { hash } from 'rsvp';

@classic
export default class TemplatesRoute extends Route {
  titleToken = 'Templates';

  model() {
    return hash({
      templates:   this.store.query('template', {}),
      definitions: this.store.findAll('template-definition')
    });
  }
}
