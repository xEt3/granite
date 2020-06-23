import { inject as service } from '@ember/service';
import Route from 'granite/core/route';

export default class ListsRoute extends Route {
  @service auth;

  titleToken = 'Lists';
  queryParams = { list: { refreshModel: true } };

  async model (params) {
    let list = [],
        company = await this.auth.get('user.company');

    if (params.list === 'dqReasons') {
      list = company.disqualificationReasons;
    }

    if (params.list === 'labels') {
      list = company.labels;
    }

    return {
      list,
      company
    };
  }

  setupController (controller, model) {
    controller.setProperties({
      model:   model.list,
      company: model.company
    });
  }
}
