import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class PlanAddRoute extends Route {
  @service store

  async model () {
    return this.store.createRecord('plan', { fromService: 'manual' });
  }

  setupController (controller, model) {
    controller.setProperties({ model });
  }
}
