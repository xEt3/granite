import Ember from 'ember';

const { Route, RSVP, inject } = Ember;

const $or = [{
  terminatedOn: { $exists: false }
}, {
  terminatedOn: null
}];

export default Route.extend({
  ajax: inject.service(),

  model () {
    let employee = this.modelFor('account.employee.offboard'),
        select = 'name email supervisor';

    return RSVP.hash({
      employee,
      employees: this.store.query('employee', {
        select,
        $or,
        _id: { $ne: employee.get('id') }
      }),
      hasDirectReports: this.hasDirectReports(employee)
    });
  },

  hasDirectReports (employee) {
    return this.get('ajax').request('/api/v1/employees', {
      data: {
        $or,
        supervisor: employee.get('id'),
        select: '_id'
      }
    })
    .then(res => res.employee && res.employee.length);
  },

  setupController (controller, model) {
    controller.setProperties({
      model: model.employee,
      employees: model.employees,
      hasDirectReports: model.hasDirectReports
    });
  }
});
