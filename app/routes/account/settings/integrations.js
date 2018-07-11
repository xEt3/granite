import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  auth: service(),

  model () {
    return this.store.findRecord('company', this.get('auth.user').get('content').belongsTo('company').id(), { reload: true });
  },

  setupController (controller, model) {
    this._super(...arguments);

    const { g, i, s } = controller.getProperties('g', 'i', 's');

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
