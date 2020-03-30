import Route from 'granite/core/route';
import { inject as service } from '@ember/service';

export default class AccountAssetNewRoute extends Route {
  @service auth
  titleToken = 'New Asset'
  modelName = 'asset-item'
  routeType = 'add'

  getModelDefaults () {
    return {
      asset:        this.modelFor('account.asset'),
      company:      this.auth.get('user.company'),
      creator:      this.auth.get('user'),
      customFields: {}
    };
  }

  async model () {
    let assetStockItem = await super.model(...arguments); // args and context

    return {
      assetStockItem,
      asset: this.modelFor('account.asset')
    };
    /*
    model = {
      assetStockItem: new stock item,
      asset: asset cat
    };
    */
  }

  setupController (controller, model) {
    controller.setProperties({
      model: model.assetStockItem,
      asset: model.asset
    });

    /*
      {{model.icon}}
      {{asset.icon}}
     */
  }
}
