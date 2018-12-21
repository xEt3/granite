import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import { computed } from '@ember/object';
import resource from 'granite/mixins/route-abstractions/resource';
// import moment from 'moment';

export default Route.extend(resource, {
  titleToken: 'Employees',
  modelName:  'employee',

  queryParams: {
    onboarding:    { refreshModel: true },
    offboarding:   { refreshModel: true },
    terminated:    { refreshModel: true },
    supervisor:    { refreshModel: true },
    department:    { refreshModel: true },
    location:      { refreshModel: true },
    hireDateStart: { refreshModel: true },
    hireDateEnd:   { refreshModel: true },
    page:          { refreshModel: true },
    limit:         { refreshModel: true },
    sortBy:        { refreshModel: true }
  },

  sort: { created: -1 },

  filters: [
    'supervisor',
    'department',
    'location'
  ],

  mutateQuery (query, params) {
    if (params.hireDateStart) {
      query.hireDate = { $gte: params.hireDateStart };
    }

    if (params.hireDateEnd) {
      query.hireDate = Object.assign(query.hireDate || {}, { $lte: params.hireDateEnd });
    }

    if (params.terminated === true) {
      query.terminatedOn = { $type: 9 };
    } else  {
      query.$or = [{ terminatedOn: { $not: { $type: 9 } } }, {
        offboarding:  true,
        terminatedOn: { $type: 9 }
      }];
    }

    [ 'onboarding', 'offboarding' ].forEach(v => {
      if (params[v]) {
        query[v] = true;
      }
    });
  },

  model () {
    return hash({
      employees:    this._super(...arguments),
      filterModels: hash({
        supervisors: this.get('supervisors'),
        departments: this.store.query('department', {
          select: '_id name',
          sort:   { name: 1 }
        }),
        locations: this.store.query('location', {
          select: '_id name',
          sort:   { name: 1 }
        })
      })
    });
  },

  supervisors: computed(function () {
    return this.ajax.request('/api/v1/employees', { data: { $report: 'supervisors' } });
  }),

  setupController (controller, model) {
    controller.setProperties({
      model:        model.employees,
      filterModels: model.filterModels
    });
  }
});
