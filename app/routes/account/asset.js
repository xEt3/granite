import Route from 'granite/core/route';

export default class AccountAssetRoute extends Route {
  titleToken = this.context.name;

  model (params) {
    return this.store.find('asset', params.id);
  }
}
