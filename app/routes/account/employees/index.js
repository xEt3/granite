import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend({
  queryParams: {
    expandFiltered: { refreshModel: false },
    onboarding: { refreshModel: true },
    supervisedBy: { refreshModel: true },
    department: { refreshModel: true },
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

    if(params.onboarding){
      employeeQuery.onboarding = true;
    }

    if(params.supervisedBy){
      employeeQuery.supervisor = params.supervisedBy;
    }

    if(params.department){
      employeeQuery.department = params.department;
    }

    // if(!isEmpty(params.filters)){
    //   let filters = params.filters;
    //   if(filters.includes('onboarding')){
    //     employeeQuery.onboarding = true;
    //   }
    //   if (filters.includes('supervisor')){
    //     console.log('supervisor if', params.selectedSupervisor);
    //     console.log('employeeQuery', employeeQuery);
    //
    //     // employeeQuery.supervisor = params.selectedSupervisor.id;
    //   }
    //
    // }

    return hash({
      allEmployees: this.store.query('employee', {}),
      allDepartments: this.store.query('department', {}),
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
      expandFiltered: model.params.expandFiltered,
      onboarding: model.params.onboarding,
      supervisorToggle: !!model.params.supervisedBy,
      supervisedBy: model.params.supervisedBy,
      departmentToggle: !!model.params.department,
      department: model.params.department
    });
  }
});
