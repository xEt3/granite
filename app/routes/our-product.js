import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  headData:   service(),
  titleToken: 'About Our Product',

  afterModel () {
    this.set('headData.description', 'Learn more about how Granite HR impowers your company with powerful human resource management tools. Asset management, employee self-service, & recruiting are just a few things we offer.');
  }
});
