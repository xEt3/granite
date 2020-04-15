import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import refreshable from 'granite/mixins/refreshable';

@classic
export default class IndexRoute extends Route.extend(refreshable) {
  titleToken = 'Asset Inventory';
  queryParams = { page: { refreshModel: true } };

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
