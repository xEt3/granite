import Route from '@ember/routing/route';
import { resolve } from 'rsvp';
import { inject as service } from '@ember/service';
import { scheduleOnce } from '@ember/runloop';
import { isEmpty } from '@ember/utils';

export default Route.extend({
  titleToken: 'Dashboard',
  ajax:       service(),
  auth:       service(),

  queryParams: {
    tag:  { refreshModel: true },
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

  async model (params) {
    let activityQuery = {
      limit: this.get('cachedActivities') ? params.limit : params.limit * (params.page + 1),
      page:  this.get('cachedActivities') ? params.page : 0,
      sort:  { created: -1 }
    };

    if (!isEmpty(params.tag)) {
      activityQuery.tag = { $in: params.tag.split(',') };
    }

    return {
      page:       params.page || 0,
      activities: await this.store.query('activity', activityQuery),
      analytics:  await this.getAnalytics(),
      tags:       await this.get('ajax').request('/api/v1/activities', {
        data: {
          _distinct: true,
          select:    'tag'
        }
      })
    };
  },

  async getAnalytics () {
    return await this.get('ajax').request('/api/v1/company/dashboard-analytics');
  },

  afterModel (model) {
    if (model.page > 0) {
      scheduleOnce('afterRender', () => {
        let $activityEl = document.querySelector('.dashboard__activity-feed');
        return $activityEl && window.scrollTo(0, $activityEl.offsetHeight);
      });
    }
  },

  setupController (controller, model) {
    this._super(...arguments);

    if (this.get('cachedActivities') && model.page > 0) {
      this.set('cachedActivities', this.get('cachedActivities').concat(model.activities.toArray()));
    } else {
      this.set('cachedActivities', model.activities.toArray());
    }

    controller.setProperties({
      model:        this.get('cachedActivities'),
      tags:         model.tags,
      totalRecords: model.activities.get('meta.totalRecords'),
      analytics:    model.analytics
    });
  },

  actions: {
    willTransition () {
      this.controller.set('page', 0);
    }
  }
});
