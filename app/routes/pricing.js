import { inject as service } from '@ember/service';
import Route from 'granite/core/route';

export default class PricingRoute extends Route {
  @service headData;

  titleToken = 'Pricing';

  afterModel () {
    this.headData.description = 'Simplistic and upfront pricing, backed with a 14-day trial gives you utter confidence in billing. Granite HR is a lightweight HRIS that helps you conquer human resources.';
  }
}
