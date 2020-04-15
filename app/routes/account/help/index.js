import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import { articles } from 'granite/config/help';
import { hash } from 'rsvp';

@classic
export default class IndexRoute extends Route {
  @service
  auth;

  model () {
    return hash({
      user: this.get('auth.user'),
      articles
    });
  }

  setupController (controller, model) {
    controller.setProperties({
      model: model.articles,
      user:  model.user
    });
  }
}
