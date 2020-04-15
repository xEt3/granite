import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

@classic
export default class PricingRoute extends Route {
  @service
  headData;

  titleToken = 'Pricing';

  afterModel () {
    this.set('headData.description', 'Simplistic and upfront pricing, backed with a 14-day trial gives you utter confidence in billing. Granite HR is a lightweight HRIS that helps you conquer human resources.');
  }
}
