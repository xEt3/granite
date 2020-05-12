import Route from 'granite/core/route';

export default class AccountActionItemTodoRoute extends Route {
  titleToken = 'Todos'

  async model () {
    return {
      actionItem:  super.model(...arguments),
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
