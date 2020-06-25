import Route from 'granite/core/route';
import { all } from 'rsvp';
import Object, { action } from '@ember/object';

export default class AccountEmployeeEquipmentRoute extends Route {
  titleToken = 'Equipment'

  async model () {
    let employee = this.modelFor('account.employee');

    let assets = await this.store.query('asset', {});

    let assignableAssets = await all(assets.map(async asset => {
      let itemQuery = { asset: asset.id };

      if (!asset.sharable) {
        itemQuery['assignments.0'] = { $exists: false };
      }

      let stock = await this.store.query('asset-item', itemQuery);

      return await Object.create({
        asset,
        stock
      });
    }));

    return {
      employee,
      assignableAssets: assignableAssets,
      assignedAssets:   (await this.store.query('asset-item', { 'assignments.employee': employee.id })).toArray()
    };

  }

  setupController (controller, model) {
    controller.setProperties({
      model:            model.assignedAssets,
      employee:         model.employee,
      assignableAssets: model.assignableAssets
    });
  }

  @action
  willTransition () {
    let modalNode = document.querySelector('.ui.modal.new-asset');

    if (modalNode && modalNode.remove) {
      modalNode.remove();
    }
  }
}
