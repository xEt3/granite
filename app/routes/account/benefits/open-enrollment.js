import Route from 'granite/core/route';
import { inject as service } from '@ember/service';

export default class OpenEnrollmentRoute extends Route {
  titleToken = 'Open Enrollment';
  @service auth;

  async model () {
    return await this.store.query('openEnrollment', { company: await this.auth.get('user.company.id') });
  }

  setupController (controller, model) {
    controller.setProperties({ model });
  }
}
