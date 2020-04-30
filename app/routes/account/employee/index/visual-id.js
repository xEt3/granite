import Route from 'granite/core/route';
import { inject as service } from '@ember/service';

export default class AccountEmployeeVisualIdRoute extends Route {
  @service ajax

  async model () {
    let employee = this.modelFor('account.employee');

    return {
      employee,
      visualIdRequired: await this.ajax.request(`/api/v1/eeo/visual-id/${employee.get('id')}`)
    };
  }

  setupController (controller, model) {
    controller.setProperties({
      model:    model.visualIdRequired,
      employee: model.employee,
      visualId: {}
    });
  }
}
