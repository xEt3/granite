import Route from 'granite/core/route';
import { inject as service } from '@ember/service';

export default class AccountEmployeeOffboardDocumentsRoute extends Route {
  @service ajax
  titleToken = 'Document Assignments'

  async model () {
    const employee = this.modelFor('account.employee.offboard');

    return {
      employee,
      offboardingDocuments: await this.store.query('file', {
        tags: { $in: [ 'Offboarding' ] },
        sort: { title: 1 }
      }),
      assignments: await this.store.query('file-assignment', {
        employee: employee.id,
        fileType: { $ne: 'Onboarding' },
        sort:     { created: 1 }
      })
    };
  }

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
}
