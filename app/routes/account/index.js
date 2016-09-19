import Ember from 'ember';

const { Route, RSVP } = Ember;

export default Route.extend({
  queryParams: {
    tag: {
      refreshModel: true
    }
  },

  model ( params ) {
    let activities = this.store.query('activity', {
          tag: params.tag,
          limit: 10,
          page: 0,
          sort: {
            created: -1
          }
        }),
        tags = Ember.$.getJSON('/api/v1/activities', { _distinct: true, select: 'tag' });
    return RSVP.hash({
      activities,
      tags
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
