import Route from 'granite/core/route';
import { inject as service } from '@ember/service';

export default class AccountEmployeeOnboardJobInformationRoute extends Route {
  @service data
  @service auth

  titleToken = 'Job Information'

  async model () {
    let company = await this.auth.get('user.company'),
        employee = this.modelFor('account.employee.onboard');

    return {
      employee,
      employees: await this.store.query('employee', {
        'company': company.id,
        _id:       { $ne: employee.id },
        sort:      { 'name.last': 1 }
      }),
      departments: await this.store.query('department', {
        'company': company.id,
        sort:      { name: 1 }
      }),
      locations: await this.store.query('location', {
        'company': company.id,
        sort:      { name: 1 }
      }),
      jobDescriptions: await this.store.query('job', {
        'company': company.id,
        sort:      { name: 1 }
      }),
      company
    };
  }

  setupController (controller, model) {
    controller.setProperties({
      model:           model.employee,
      employees:       model.employees,
      company:         model.company,
      departments:     model.departments,
      locations:       model.locations,
      jobDescriptions: model.jobDescriptions
    });
  }
}
