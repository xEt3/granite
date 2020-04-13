import Route from 'granite/core/route';
import { inject as service } from '@ember/service';

export default class AccountEmployeeOnboardDocumentsRoute extends Route {
  @service ajax
  titleToken = 'Document Assignments'

  async model () {
    const employee = this.modelFor('account.employee.onboard');

    return {
      employee,
      suggestedDocuments:  await this.ajax.request(`/api/v1/employee/${employee.id}/suggested-documents`),
      onboardingDocuments: await this.store.query('file', {
        tags: { $in: [ 'Onboarding' ] },
        sort: { title: 1 }
      }),
      assignments: await this.store.query('file-assignment', {
        employee: employee.id,
        sort:     { created: 1 }
      })
    };
  }

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
}
