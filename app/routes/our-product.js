import { inject as service } from '@ember/service';
import Route from 'granite/core/route';

export default class OurProductRoute extends Route {
  @service headData;

  titleToken = 'About Our Product';

  afterModel () {
    this.headData.set('description', 'Learn more about how Granite HR impowers your company with powerful human resource management tools. Asset management, employee self-service, & recruiting are just a few things we offer.');
  }
}
