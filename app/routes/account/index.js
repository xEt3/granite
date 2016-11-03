import Ember from 'ember';

const { Route, RSVP, inject } = Ember;

export default Route.extend({
  ajax: inject.service(),

  queryParams: {
    tag: {
      refreshModel: true
    }
  },

  model ( params ) {
    let activityQuery = {
      limit: 10,
      page: 0,
      sort: { created: -1 }
    };

    if (!Ember.isEmpty(params.tag)) {
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
