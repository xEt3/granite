import Route from 'granite/core/route';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { scheduleOnce } from '@ember/runloop';
import { isEmpty } from '@ember/utils';

export default class AccountIndexRoute extends Route {
  titleToken = 'Dashboard'

  @service ajax
  @service auth

  queryParams = {
    tag:  { refreshModel: true },
    page: { refreshModel: true }
  }

  async beforeModel () {
    let user = await this.auth.get('user'),
        company = await user.get('company');

    if (company && !company.firstStepsCompletedOn) {
      return this.transitionTo('account.first-steps');
    }
  }

  async model (params) {
    let activityQuery = {
      limit: this.cachedActivities ? params.limit : params.limit * (params.page + 1),
      page:  this.cachedActivities ? params.page : 0,
      sort:  { created: -1 }
    };

    if (!isEmpty(params.tag)) {
      activityQuery.tag = { $in: params.tag.split(',') };
    }

    return {
      page:       params.page || 0,
      activities: await this.store.query('activity', activityQuery),
      analytics:  await this.getAnalytics(),
      tags:       await this.ajax.request('/api/v1/activities', {
        data: {
          _distinct: true,
          select:    'tag'
        }
      })
    };
  }

  async getAnalytics () {
    return await this.ajax.request('/api/v1/company/dashboard-analytics');
  }

  afterModel (model) {
    if (model.page > 0) {
      scheduleOnce('afterRender', () => {
        let $activityEl = document.querySelector('.dashboard__activity-feed');
        return $activityEl && window.scrollTo(0, $activityEl.offsetHeight);
      });
    }
  }

  setupController (controller, model) {
    super.setupController(...arguments);

    if (this.cachedActivities && model.page > 0) {
      this.cachedActivities = this.cachedActivities.concat(model.activities.toArray());
    } else {
      this.cachedActivities = model.activities.toArray();
    }

    controller.setProperties({
      model:        this.cachedActivities,
      tags:         model.tags,
      totalRecords: model.activities.meta.totalRecords,
      analytics:    model.analytics
    });
  }

  @action
  willTransition (transition) {
    if (transition.targetName !== 'account.index') {
      this.controller.page = 0;
    }
  }
}
