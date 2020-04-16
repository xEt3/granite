import Route from 'granite/core/route';

export default class AccountAssetsRoute extends Route {
  titleToken = 'Assets'
  queryParams = { page: { refreshModel: true } }

  model (params) {
    let limit = 20,
        page = (params.page || 1) - 1;

    return this.store.query('asset', {
      page,
      limit
    });
  }
}
