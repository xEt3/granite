import Route from 'granite/core/route';
import { inject as service } from '@ember/service';

export default class AccountEmployeeIndexRoute extends Route {
  @service ajax
  @service auth

  async model () {
    let employee = this.modelFor('account.employee'),
        company = await this.auth.get('user.company') || {};

    if (company.collectEEO) {
      try {
        let visualId = await this.ajax.request(`/api/v1/eeo/visual-id/${employee.id}`);
        this.visualIdRequired = visualId.visualIdRequired;
      } catch (e) {
        this.visualIdRequired = false;
      }
    }

    return employee;
  }

  setupController (controller, model) {
    controller.setProperties({
      model:            model,
      visualIdRequired: this.visualIdRequired
    });
  }
}
