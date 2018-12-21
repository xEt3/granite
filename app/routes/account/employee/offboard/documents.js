import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default Route.extend({
  ajax:       service(),
  titleToken: 'Document Assignments',

  model () {
    const employee = this.modelFor('account.employee.offboard');

    return hash({
      employee,
      offboardingDocuments: this.store.query('file', {
        tags: { $in: [ 'Offboarding' ] },
        sort: { title: 1 }
      }),
      assignments: this.store.query('file-assignment', {
        employee: employee.get('id'),
        sort:     { created: 1 }
      })
    });
  },

  setupController (controller, model) {
    const {
      employee,
      offboardingDocuments,
      assignments
    } = model;

    controller.setProperties({
      employee,
      offboardingDocuments,
      assignments: assignments.toArray()
    });
  }
});
