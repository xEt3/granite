import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

@classic
export default class BillingRoute extends Route {
  titleToken = 'Billing';

  @service
  auth;

  @service
  ajax;

  model() {
    return this.modelFor('account.settings');
  }
}
