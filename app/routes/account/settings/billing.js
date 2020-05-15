import { inject as service } from '@ember/service';
import Route from 'granite/core/route';

export default class BillingRoute extends Route {
  titleToken = 'Billing';

  @service auth;

  @service ajax;

  model () {
    return this.modelFor('account.settings');
  }
}
