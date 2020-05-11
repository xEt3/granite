import Route from 'granite/core/route';
import { inject as service } from '@ember/service';

export default class AccountSettingsIntegrationsRoute extends Route {
  @service auth
  titleToken = 'Integrations'

  model () {
    return this.store.find('company', this.auth.get('user.company.id'));
  }

  setupController (controller, model) {
    super.model(...arguments);

    const { g, i, s } = controller;

    if (g && i && s && !model.get('linkedServices').includes(s)) {
      controller.grant();
    }

    controller.model = model;
  }
}
