import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class PlanEditRoute extends Route {
  @service store

  async model (params) {
    return this.store.find('plan', params.plan_id);
  }
}
