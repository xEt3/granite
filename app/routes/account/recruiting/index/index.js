import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import resource from 'granite/mixins/route-abstractions/resource';

export default Route.extend(resource, {
  titleToken: 'Recruiting Campaigns',
  modelName:  'job-opening',

  queryParams: {
    job:    { refreshModel: true },
    closed: { refreshModel: true },
    setup:  { refreshModel: true },
    page:   { refreshModel: true },
    limit:  { refreshModel: true },
    sortBy: { refreshModel: true }
  },

  sort: {
    completedOn: 1,
    startOn:     1
  },

  filters: [
    'job'
  ],

  mutateQuery (query, params) {
    [ 'closed', 'setup' ].forEach(v => {
      if (params[v]) {
        query[v] = true;
      }
    });
  },

  model () {
    return hash({
      campaigns: this._super(...arguments),
      jobs:      this.store.query('job', {
        select: '_id title',
        sort:   { 'name.last': 1 }
      })
    });
  },

  setupController (controller, model) {
    controller.setProperties({
      model: model.campaigns,
      jobs:  model.jobs
    });
  }
});
