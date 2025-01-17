import Route from 'granite/core/route';

export default class AccountActionItemEditRoute extends Route {
  routeType = 'edit'
  titleToken = 'Edit'
  bypassModelHook = true

  async model () {
    const actionItem = await super.model(...arguments);

    return {
      actionItem,
      actionItems: await this.store.query('action-item', {
        _id:         { $ne: actionItem.id },
        completedOn: { $not: { $type: 9 } },
        cancelledOn: { $not: { $type: 9 } }
      })
    };
  }

  setupController (controller, model) {
    controller.setProperties({
      model:       model.actionItem,
      actionItems: model.actionItems
    });
  }
}
