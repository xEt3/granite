import Route from 'granite/core/route';

export default class AssetRoute extends Route {
  titleToken () {
    return this.context.name;
  }

  model (params) {
    return this.store.find('asset', params.id);
  }
}
