import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  ajax: service(),

  async model () {
    let employee = this.modelFor('account.employee');

    return {
      employee,
      visualIdRequired: await this.get('ajax').request(`/api/v1/eeo/visual-id/${employee.get('id')}`)
    };
  },

  setupController (controller, model) {
    controller.setProperties({
      model:    model.visualIdRequired,
      employee: model.employee,
      visualId: {}
    });
  }
});
