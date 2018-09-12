import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

export default Route.extend(addEdit,{
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
        _id:       { $ne: employeeId }
      }),
      departments: this.store.query('department', { 'company': companyId }),
      locations:   this.store.query('location', { 'company': companyId }),
      company
    });
  },

  setupController (controller, model) {
    controller.setProperties({
      model:       model.employee,
      employees:   model.employees,
      company:     model.company,
      departments: model.departments,
      locations:   model.locations
    });
  }
});
