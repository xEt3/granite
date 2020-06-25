import Route from 'granite/core/route';

export default class AccountAssetItemEditRoute extends Route {
  titleToken = 'Edit Asset'
  modelName =  'asset-item'
  segmentKey = 'asset_item_id'
  routeType = 'edit'

  async model () {
    return {
      item:  await super.model(...arguments),
      asset: this.modelFor('account.asset')
    };
  }

  setupController (controller, model) {
    controller.setProperties({
      model: model.item,
      asset: model.asset
    });
  }
}
