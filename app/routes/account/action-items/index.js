import Route from 'granite/core/route';
import { isEmpty } from '@ember/utils';

export default class AccountActionItemsRoute extends Route {
  titleToken = 'Projects'

  queryParams = {
    filter: { refreshModel: true },
    isDsc:  { refreshModel: true }
  }

  async model (params) {
    let actionItemQuery = {
      $and: [
        { completedOn: { $not: { $type: 9 } } },
        { cancelledOn: { $not: { $type: 9 } } }
      ],
      sort: {
        priority: -1,
        dueOn:    params.isDsc ? 1 : -1
      }
    };

    if (!isEmpty(params.filter)) {
      actionItemQuery.priority = { $in: params.filter };
    }

    return { actionItems: await this.store.query('action-item', actionItemQuery) };
  }

  setupController (controller, model) {
    super.setupController(...arguments);
    controller.setProperties({ model: model.actionItems });
  }
}
