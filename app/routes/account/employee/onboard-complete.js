import Ember from 'ember';

const { Route, RSVP, inject } = Ember;

export default Route.extend({
  auth: inject.service(),
  ajax: inject.service(),

  model () {
    return RSVP.hash({
      employee: this.modelFor('employee'),
      employeeCount: this.get('ajax').request('/api/v1/employees/', { _count: true, company: this.get('auth.user.company.id') })
    });
  },

  setupController ( controller, model ) {
    controller.setProperties({
      model: model.employee,
      employeeCount: model.employeeCount
    });
  }
});
