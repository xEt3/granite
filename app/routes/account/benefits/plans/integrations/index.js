import Route from 'granite/core/route';
import { carriers } from 'granite/config';
import { inject as service } from '@ember/service'

export default class IntegrationsRoute extends Route {
  titleToken = 'Integrations';
  @service auth;

  async model () {
    let plans = await this.store.query('plan', {
      company: await this.auth.user.get('company.id')
    })
    let groupedPlans = plans.reduce((group,plan) => {
      if (!group[plan.label]) {
        group[plan.label] = [ plan ];
        return group;
      }
      group[plan.label].push(plan);
      return group;
    }, {})
    return { 
      groupedPlans,
      carriers
    }
  }
  setupController (controller, model) {
    controller.setProperties({
      model: model.carriers,
      plans: model.groupedPlans
    })
  }
}
