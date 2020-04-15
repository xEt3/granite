import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import refreshable from 'granite/mixins/refreshable';

@classic
export default class IndexRoute extends Route.extend(refreshable) {
  @service
  ajax;

  @service
  auth;

  async model () {
    let employee = this.modelFor('account.employee'),
        company = await this.get('auth.user.company') || {};

    if (company.collectEEO) {
      try {
        let visualId = await this.ajax.request(`/api/v1/eeo/visual-id/${employee.get('id')}`);
        this.set('visualIdRequired', visualId.visualIdRequired);
      } catch (e) {
        this.set('visualIdRequired', false);
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
