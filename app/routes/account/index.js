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
    page: { refreshModel: true }
  },

  model ( params ) {
    const that = this;
    let activityQuery = {
      limit: that.get('cachedActivities') ? params.limit : params.limit * (params.page+1),
      page: that.get('cachedActivities') ? params.page : 0,
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

    if( this.get('cachedActivities') ) {
      this.set('cachedActivities', this.get('cachedActivities').concat(model.activities.toArray()));
    } else {
      this.set('cachedActivities', model.activities.toArray());
    }

    if ( model.activities.meta.totalRecords <= this.get('cachedActivities').length ) {
      this.set('disabled', true);
    }

    controller.setProperties({
      model: this.get('cachedActivities'),
      tags: model.tags,
      disabled: this.get('disabled')
    });
  }
});
