import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class EditRoute extends Route {
  model ({ location_id }) {
    return this.store.find('location', location_id);
  }
}
