import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';

export default Route.extend({
  titleToken: 'Edit Jobs',
  auth:       service(),

  model () {
    let company = this.get('auth.user.company'),
        companyId = company.get('id'),
        employee = this.modelFor('account.employee.index.edit'),
        employeeId = employee.get('id');

    return RSVP.hash({
      employee,
      employees: this.store.query('employee', {
        'company': companyId,
        _id:       { $ne: employeeId }
      }),
      departments:     this.store.query('department', { 'company': companyId }),
      locations:       this.store.query('location', { 'company': companyId }),
      jobDescriptions: this.store.query('job', { 'company': companyId }),
      company
    });
  },

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
});
