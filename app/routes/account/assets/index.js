import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class IndexRoute extends Route {
  titleToken = 'Assets';
  queryParams = { page: { refreshModel: true } };

  model(params) {
    let limit = this.get('controller.limit') || 20,
        page = (params.page || 1) - 1;

    return this.store.query('asset', {
      page,
      limit
    });
  }
}
