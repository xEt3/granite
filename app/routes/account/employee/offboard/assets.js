import Route from 'granite/core/route';

export default class AccountEmployeeOffboardAssetsRoute extends Route {
  titleToken = 'Assets'

  async model () {
    let employee = this.modelFor('account.employee.offboard');

    return {
      employee,
      assetItems: await this.store.query('asset-item', { 'assignments.employee': employee.id }).then(assets => assets.toArray())
    };
  }

  setupController (controller, model) {
    controller.setProperties({
      model:    model.assetItems,
      employee: model.employee
    });
  }
}
