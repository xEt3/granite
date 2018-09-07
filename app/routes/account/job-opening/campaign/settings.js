import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import edit from 'granite/mixins/route-abstractions/edit';

export default Route.extend(edit, {
  titleToken: 'Settings',

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
