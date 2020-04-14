import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

@classic
export default class OurProductRoute extends Route {
  @service
  headData;

  titleToken = 'About Our Product';

  afterModel() {
    this.set('headData.description', 'Learn more about how Granite HR impowers your company with powerful human resource management tools. Asset management, employee self-service, & recruiting are just a few things we offer.');
  }
}
