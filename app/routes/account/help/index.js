import Route from '@ember/routing/route';
import { articles } from 'granite/config/help';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default Route.extend({
  auth: service(),

  model () {
    return hash({
      user: this.get('auth.user'),
      articles
    });
  },

  setupController (controller, model) {
    controller.setProperties({
      model: model.articles,
      user:  model.user
    });
  }
});
