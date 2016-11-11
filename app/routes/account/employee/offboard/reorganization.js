import Ember from 'ember';

const { Route, RSVP } = Ember;

export default Route.extend({
  model () {
    let employee = this.modelFor('account.employee.offboard');

    return RSVP.hash({
      employee,
      supervised: this.store.query('employee', {
        supervisor: employee.get('id'),
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
      model: model.supervised,
      employee: model.employee
    });
  }
});
