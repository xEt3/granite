import Route from 'granite/core/route';

export default class AccountAssetRoute extends Route {
  titleToken = 'Asset Inventory'
  queryParams = { page: { refreshModel: true } }

  model (params) {
    let page = (params.page || 1) - 1,
        limit = 10;

    return this.store.query('asset-item', {
      page,
      limit,
      asset: this.paramsFor('account.asset').id
    });
  }
}
