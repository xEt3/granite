import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

export default Route.extend(addEdit, {
  titleToken: 'Job Information',
  auth:       service(),

  model () {
    let company = this.get('auth.user.company'),
        companyId = company.get('id'),
        employee = this.modelFor('account.employee.onboard'),
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
        sort:      { name: 1 }
      }),
      company
    });
  },

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
});
