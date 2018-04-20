import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import moment from 'moment';

export default Route.extend({
  queryParams: {
    expandFiltered: { refreshModel: false },
    onboarding: { refreshModel: true },
    supervisedBy: { refreshModel: true },
    department: { refreshModel: true },
    location: { refreshModel: true },
    startDate: { refreshModel: true },
    endDate: { refreshModel: true },
    page: { refreshModel: true },
  },

  model ( params ) {
    let limit = this.get('controller.limit') || 20,
        page = (params.page || 1) - 1;

    let employeeQuery = {
      limit,
      page,
      sort: { created: -1 }
    };

    if (params.onboarding) {
      employeeQuery.onboarding = true;
    }

    if (params.supervisedBy) {
      employeeQuery.supervisor = params.supervisedBy;
    }

    if (params.department) {
      employeeQuery.department = params.department;
    }

    if (params.location) {
      employeeQuery.location = params.location;
    }

    if ( params.startDate && params.endDate ) {
        employeeQuery.hireDate = {
          $gte: params.startDate,
          $lte: params.endDate
        };
      }

    return hash({
      allEmployees: this.store.query('employee', {}),
      allDepartments: this.store.query('department', {}),
      allLocations: this.store.query('location', {}),
      employees: this.store.query('employee', employeeQuery),
      params
    });
  },

  setupController ( controller, model ) {
    this._super(...arguments);
    const params = model.params;
    controller.setProperties({
      model: model.employees,
      allEmployees: model.allEmployees,
      allDepartments: model.allDepartments,
      allLocations: model.allLocations,
      expandFiltered: params.expandFiltered,
      onboarding: params.onboarding,
      supervisorToggle: !!params.supervisedBy,
      supervisedBy: params.supervisedBy,
      departmentToggle: !!params.department,
      department: params.department,
      locationToggle: !!params.location,
      location: params.location,
      hireDateToggle: !!params.startDate || !!params.endDate,
      startDateEntered: params.startDate ? moment(new Date(params.startDate).toISOString()).format('MMMM D, YYYY') : null,
      endDateEntered: params.endDate ? moment(new Date(params.endDate).toISOString()).format('MMMM D, YYYY') : null
    });
  }
});
