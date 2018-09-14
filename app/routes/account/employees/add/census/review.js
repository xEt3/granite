import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  ajax: service(),

  model ({ uploadId }) {
    return this.get('ajax').request(`/api/v1/employee/census/${uploadId}`);
  },

  setupController (controller) {
    controller.set('dryrunResult', null);
    this._super(...arguments);
  }
});
