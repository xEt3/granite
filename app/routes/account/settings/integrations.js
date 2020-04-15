import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  titleToken: 'Integrations',
  auth:       service(),

  model () {
    return this.store.find('company', this.get('auth.user.company.id'));
  },

  setupController (controller, model) {
    this._super(...arguments);

    const { g, i, s } = controller;

    if (g && i && s && !model.get('linkedServices').includes(s)) {
      controller.grant();
    }
  },

  actions: {
    refresh () {
      this.refresh();
    }
  }
});
