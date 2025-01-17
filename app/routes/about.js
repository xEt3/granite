import { inject as service } from '@ember/service';
import Route from 'granite/core/route';

export default class AboutRoute extends Route {
  @service headData

  titleToken = 'About'

  afterModel () {
    this.set('headData.description', 'Granite HR is developed by a tight-knit team based in Billings, MT inside of Associated Employers. Associated Employers has helped employers for over a century.');
  }
}
