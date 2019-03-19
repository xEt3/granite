import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  headData:   service(),
  titleToken: 'About',

  afterModel () {
    this.set('headData.description', 'Granite HR is developed by a tight-knit team based in Billings, MT inside of Associated Employers. Associated Employers has helped employers for over a century.');
  }
});
