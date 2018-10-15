import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import resource from 'granite/mixins/route-abstractions/resource';

export default Route.extend(resource, {
  titleToken: 'Recruiting Campaigns',
  modelName:  'job-opening',
  sort:       {
    completedOn: 1,
    startOn:     1
  },

  queryParams: {
    job:    { refreshModel: true },
    closed: { refreshModel: true },
    setup:  { refreshModel: true },
    page:   { refreshModel: true },
    limit:  { refreshModel: true },
    sortBy: { refreshModel: true }
  },

  filters: [
    'job'
  ],

  //START WITH MUTATEQUERY ON TUESDAY

  // mutateQuery (query, params) {
  //   if (params.hireDateStart) {
  //     query.hireDate = { $gte: params.hireDateStart };
  //   }
  //
  //   if (params.hireDateEnd) {
  //     query.hireDate = Object.assign(query.hireDate || {}, { $lte: params.hireDateEnd });
  //   }
  //
  //   if (params.terminated === true) {
  //     query.terminatedOn = { $type: 9 };
  //   } else  {
  //     query.$or = [{ terminatedOn: { $not: { $type: 9 } } }, {
  //       offboarding:  true,
  //       terminatedOn: { $type: 9 }
  //     }];
  //   }
  //
  //   [ 'onboarding', 'offboarding' ].forEach(v => {
  //     if (params[v]) {
  //       query[v] = true;
  //     }
  //   });
  // },

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
