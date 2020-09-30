import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ContributionsRoute extends Route {
  @service auth

  async model () {
    let company = await this.auth.get('user.company');

    return {
      company,
      plans: await this.store.query('plan', { company: company._id })
    };
  }

  setupController (controller, model) {
    controller.setProperties({
      model:   model.plans.toArray(),
      company: model.company
    });
  }
}
