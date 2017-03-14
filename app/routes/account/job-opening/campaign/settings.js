import Ember from 'ember';
import edit from 'granite/mixins/route-abstractions/edit';

const { Route, RSVP } = Ember;

export default Route.extend(edit, {
  model () {
    return RSVP.hash({
      jobOpening: this.modelFor('account.job-opening'),
      locations: this.store.findAll('location'),
      employees: this.store.query('employee', {
        email: { $exists: true },
        companyUser: { $exists: true }
      })
    });
  },

  setupController (controller, model) {
    controller.setProperties({
      model: model.jobOpening,
      locations: model.locations,
      employees: model.employees
    });
  }
});
