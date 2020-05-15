import { inject as service } from '@ember/service';
import Route from 'granite/core/route';
import { articles } from 'granite/config/help';

export default class IndexRoute extends Route {
  @service auth;

  model () {
    return {
      user: this.auth.user,
      articles
    };
  }

  setupController (controller, model) {
    Object.assign(controller, {
      model: model.articles,
      user:  model.user
    });
  }
}
