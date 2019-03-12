import Route from '@ember/routing/route';
import { isEmpty } from '@ember/utils';
import RSVP from 'rsvp';

export default Route.extend({
  titleToken: 'Projects',

  queryParams: {
    filter: { refreshModel: true },
    isDsc:  { refreshModel: true }
  },

  model (params) {
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

    return RSVP.hash({ actionItems: this.store.query('action-item', actionItemQuery) });
  },

  setupController (controller, model) {
    this._super(...arguments);
    controller.setProperties({ model: model.actionItems });
  }
});
