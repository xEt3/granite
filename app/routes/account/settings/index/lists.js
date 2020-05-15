import { inject as service } from '@ember/service';
import Route from 'granite/core/route';

export default class ListsRoute extends Route {
  @service auth;

  titleToken = 'Lists';
  queryParams = { list: { refreshModel: true } };

  async model (params) {
    let list = [],
        company = this.get('auth.user.company');

    if (params.list === 'dqReasons') {
      list = company.get('disqualificationReasons');
    }

    if (params.list === 'labels') {
      list = company.get('labels');
    }

    return {
      list,
      company
    };
  }

  setupController (controller, model) {
    Object.assign(controller, {
      model:   model.list,
      company: model.company
    });
  }
}
