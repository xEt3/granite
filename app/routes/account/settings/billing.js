import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  titleToken: 'Billing',
  auth:       service(),
  ajax:       service(),

  model () {
    return this.modelFor('account.settings');
  }
});
