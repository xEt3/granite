import Route from '@ember/routing/route';
import { hash, resolve } from 'rsvp';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';

export default Route.extend({
  titleToken: 'Dashboard',
  ajax: service(),
  auth: service(),

  queryParams: {
    tag: { refreshModel: true },
    page: { refreshModel: true }
  },

  beforeModel () {
    return resolve(this.get('auth.user'))
    .then(user => resolve(user.get('company')))
    .then(company => {
      if (company && !company.get('firstStepsCompletedOn')) {
        return this.transitionTo('account.first-steps');
      }
    });
  },

  model (params) {
    let activityQuery = {
      limit: this.get('cachedActivities') ? params.limit : params.limit * (params.page + 1),
      page: this.get('cachedActivities') ? params.page : 0,
      sort: { created: -1 }
    };

    if (!isEmpty(params.tag)) {
      activityQuery.tag = { $in: params.tag.split(',') };
    }
    return hash({
      activities: this.store.query('activity', activityQuery),
      tags: this.get('ajax').request('/api/v1/activities', { data: { _distinct: true, select: 'tag' } })
    });
  },

  setupController (controller, model) {
    this._super(...arguments);

    if (this.get('cachedActivities')) {
      this.set('cachedActivities', this.get('cachedActivities').concat(model.activities.toArray()));
    } else {
      this.set('cachedActivities', model.activities.toArray());
    }

    controller.setProperties({
      model:        this.get('cachedActivities'),
      tags:         model.tags,
      totalRecords: model.activities.get('meta.totalRecords')
    });
  }
});
