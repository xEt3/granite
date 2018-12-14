import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default Route.extend({
  ajax:       service(),
  titleToken: 'Document Assignments',

  model () {
    const employee = this.modelFor('account.employee.onboard');

    return hash({
      employee,
      suggestedDocuments:  this.ajax.request(`/api/v1/employee/${employee.get('id')}/suggested-documents`),
      onboardingDocuments: this.store.query('file', {
        tags: { $in: [ 'Onboarding' ] },
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
      suggestedDocuments,
      onboardingDocuments,
      assignments
    } = model;

    controller.setProperties({
      employee,
      suggestedDocuments,
      onboardingDocuments,
      assignments: assignments.toArray()
    });
  }
});