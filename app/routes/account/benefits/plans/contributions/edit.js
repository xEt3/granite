import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ContributionsRoute extends Route {
  @service auth

  async model (params) {
    return {
      company: await this.auth.get('user.company'),
      plan:    await this.store.find('plan', params.plan_id)
    };
  }

  setupController (controller, model) {
    controller.setProperties({
      model:   model.plan,
      company: model.company
    });
  }
}

