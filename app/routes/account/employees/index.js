import { GraniteResourceRoute } from 'granite/core/route';
import { hash } from 'rsvp';

export default class AccountEmployeesRoute extends GraniteResourceRoute {
  titleToken = 'Employees'
  modelName = 'employee'

  queryParams = {
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
    sortAsc:       { refreshModel: true }
  }

  filters = [
    'supervisor',
    'department',
    'location'
  ]

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
  }

  model () {
    return hash({
      employees:    super.model(...arguments),
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
  }

  get supervisors () {
    return this.ajax.request('/api/v1/employees', { data: { $report: 'supervisors' } }).then(response => response.employee);
  }

  setupController (controller, model) {
    controller.setProperties({
      model:        model.employees,
      filterModels: model.filterModels
    });
  }
}
