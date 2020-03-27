import Route from 'granite/core/route';
import { inject as service } from '@ember/service';

export default class AccountActionItemNewRoute extends Route {
  @service auth
  titleToken = 'New Project'
  routeType = 'add'
  modelName =  'action-item'

  getModelDefaults () {
    return {
      owner:   this.auth.get('user.employee'),
      company: this.auth.get('user.company')
    };
  }

  async model () {
    return {
      actionItem:  await super.model(...arguments),
      actionItems: await this.store.query('action-item', {
        completedOn: { $not: { $type: 9 } },
        cancelledOn: { $not: { $type: 9 } }
      }),
      employees: await this.store.findAll('employee')
    };
  }

  setupController (controller, model) {
    controller.setProperties({
      model:       model.actionItem,
      actionItems: model.actionItems,
      employees:   model.employees
    });
  }
}
