import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  headData:   service(),
  titleToken: 'Pricing',

  afterModel () {
    this.set('headData.description', 'Simplistic and upfront pricing, backed with a 14-day trial gives you utter confidence in billing. Granite HR is a lightweight HRIS that helps you conquer human resources.');
  }
});
