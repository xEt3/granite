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
    startDate: { refreshModel: true},
    endDate: { refreshModel: true},
    page: { refreshModel: true }
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

    if ( params.startDate && moment(params.startDate).isValid() ) {
      console.log(params.startDate);
        employeeQuery.hireDate = {
          $gte: params.startDate
        };
      }

    if ( params.endDate && moment(params.endDate).isValid() ) {
        employeeQuery.hireDate = {
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
    controller.setProperties({
      model: model.employees,
      allEmployees: model.allEmployees,
      allDepartments: model.allDepartments,
      allLocations: model.allLocations,
      expandFiltered: model.params.expandFiltered,
      onboarding: model.params.onboarding,
      supervisorToggle: !!model.params.supervisedBy,
      supervisedBy: model.params.supervisedBy,
      departmentToggle: !!model.params.department,
      department: model.params.department,
      locationToggle: !!model.params.location,
      location: model.params.location,
      hireDateToggle: !!model.params.startDate || !!model.params.endDate,
      startDate: model.params.startDate,

      endDate: model.params.endDate
    });
  }
});
