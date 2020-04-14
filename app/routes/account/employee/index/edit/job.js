import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import RSVP from 'rsvp';

@classic
export default class JobRoute extends Route {
  titleToken = 'Edit Jobs';

  @service
  auth;

  model() {
    let company = this.get('auth.user.company'),
        companyId = company.get('id'),
        employee = this.modelFor('account.employee.index.edit'),
        employeeId = employee.get('id');

    return RSVP.hash({
      employee,
      employees: this.store.query('employee', {
        'company': companyId,
        _id:       { $ne: employeeId },
        sort:      { 'name.last': 1 }
      }),
      departments: this.store.query('department', {
        'company': companyId,
        sort:      { name: 1 }
      }),
      locations: this.store.query('location', {
        'company': companyId,
        sort:      { name: 1 }
      }),
      jobDescriptions: this.store.query('job', {
        'company': companyId,
        sort:      { title: 1 }
      }),
      company
    });
  }

  setupController(controller, model) {
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
