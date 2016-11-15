import Ember from 'ember';

const { Route, RSVP } = Ember;

export default Route.extend({
  model () {
    let employee = this.modelFor('account.employee.offboard'),
        select = 'name email';

    return RSVP.hash({
      employee,
      employees: this.store.query('employee', {
        select,
        _id: { $ne: employee.get('id') },
        $or: [{
          terminatedOn: { $exists: false }
        }, {
          terminatedOn: null
        }]
      })
    });
  },

  setupController (controller, model) {
    controller.setProperties({
      model: model.employee,
      employees: model.employees
    });
  }
});
