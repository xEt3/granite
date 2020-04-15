import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

@classic
export default class VisualIdRoute extends Route {
  @service
  ajax;

  async model() {
    let employee = this.modelFor('account.employee');

    return {
      employee,
      visualIdRequired: await this.ajax.request(`/api/v1/eeo/visual-id/${employee.get('id')}`)
    };
  }

  setupController(controller, model) {
    controller.setProperties({
      model:    model.visualIdRequired,
      employee: model.employee,
      visualId: {}
    });
  }
}
