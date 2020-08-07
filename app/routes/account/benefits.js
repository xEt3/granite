import Route from 'granite/core/route';
import { inject as service } from '@ember/service';

export default class BenefitsRoute extends Route {
  @service subscription

  titleToken () {
    return 'Benefits';
  }

  subscriptionRoute = {
    flag:        'benefitsEnabled',
    redirectsTo: 'account.benefits-paywall'
  }
}
