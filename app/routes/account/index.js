import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';

export default Route.extend({
  ajax: service(),

  queryParams: {
    tag: {
      refreshModel: true
    },
    limit: { refreshModel: true }
  },

  model ( params ) {
    let activityQuery = {
      limit: params.limit,
      page: 0,
      sort: { created: -1 }
    };

    if (!isEmpty(params.tag)) {
      activityQuery.tag = { $in: params.tag.split(',') };
    }

    return RSVP.hash({
      activities: this.store.query('activity', activityQuery),
      tags: this.get('ajax').request('/api/v1/activities', { data: { _distinct: true, select: 'tag' } })
    });
  },

  setupController ( controller, model ) {
    this._super(...arguments);
    controller.setProperties({
      model: model.activities,
      tags: model.tags
    });
  }
});
