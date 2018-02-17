import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  auth: service(),

  model () {
    return this.store.findRecord('company', this.get('auth.user').get('content').belongsTo('company').id(), { reload: true });
  },

  actions: {
    refresh () {
      this.refresh();
    }
  }
});
