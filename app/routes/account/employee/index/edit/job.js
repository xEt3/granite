import { inject as service } from '@ember/service';
import Route from 'granite/core/route';

export default class JobRoute extends Route {
  titleToken = 'Edit Jobs';

  @service auth;

  async model () {
    let company = this.get('auth.user.company'),
        companyId = company.get('id'),
        employee = this.modelFor('account.employee.index.edit'),
        employeeId = employee.id;

    return {
      employee,
      employees: await this.store.query('employee', {
        'company': companyId,
        _id:       { $ne: employeeId },
        sort:      { 'name.last': 1 }
      }),
      departments: await this.store.query('department', {
        'company': companyId,
        sort:      { name: 1 }
      }),
      locations: await this.store.query('location', {
        'company': companyId,
        sort:      { name: 1 }
      }),
      jobDescriptions: await this.store.query('job', {
        'company': companyId,
        sort:      { title: 1 }
      }),
      company
    };
  }

  setupController (controller, model) {
    controller.setProperties({
      model:           model.employee,
      employees:       model.employees,
      departments:     model.departments,
      locations:       model.locations,
      company:         model.company,
      jobDescriptions: model.jobDescriptions
    });
  }
}
