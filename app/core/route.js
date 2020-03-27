import Route from '@ember/routing/route';
import { action } from '@ember/object';

export default class GraniteRoute extends Route {
  @action
  refreshModel () {
    this.refresh();
  }
}
