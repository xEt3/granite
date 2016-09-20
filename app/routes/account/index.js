import Ember from 'ember';

const { Route, RSVP } = Ember;

export default Route.extend({
  queryParams: {
    tag: {
      refreshModel: true
    }
  },

  model ( params ) {
    let activityQuery = {
      limit: 10,
      page: 0,
      sort: {
        created: -1
      }
    };
    if(!Ember.isEmpty(params.tag)) {
      activityQuery.tag = params.tag;
    }
    return RSVP.hash({
      activities: this.store.query('activity', activityQuery),
      tags: Ember.$.getJSON('/api/v1/activities', { _distinct: true, select: 'tag' })
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
