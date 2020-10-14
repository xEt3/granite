import Route from 'granite/core/route';
import { inject as service } from '@ember/service';

export default class IntegrationsRoute extends Route {
  @service auth;

  async model () {
    return this.store.query('plan', { company: (await this.auth.user).get('company.id') });
  }

  setupController (controller, plans) {
    controller.setProperties({
      plans,
      groupedPlans: plans && plans.length && plans.reduce((group, plan) => {
        const { label } = plan;

        if (!group[label]) {
          group[label] = [];
        }

        group[plan.label].push(plan);
        return group;
      }, {})
    });
  }
}
