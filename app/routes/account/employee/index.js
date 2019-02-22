import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import refreshable from 'granite/mixins/refreshable';

export default Route.extend(refreshable, {
  ajax: service(),
  auth: service(),

  async model () {
    let employee = this.modelFor('account.employee'),
        company = await this.get('auth.user.company') || {};

    if (company.collectEEO) {
      try {
        let visualId = await this.get('ajax').request(`/api/v1/eeo/visual-id/${employee.get('id')}`);
        this.set('visualIdRequired', visualId.visualIdRequired);
      } catch (e) {
        this.set('visualIdRequired', false);
      }
    }

    return employee;
  },

  setupController (controller, model) {
    controller.setProperties({
      model:            model,
      visualIdRequired: this.get('visualIdRequired')
    });
  }
});
