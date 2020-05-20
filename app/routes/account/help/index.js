import Route from 'granite/core/route';
import { inject as service } from '@ember/service';
import { articles } from 'granite/config/help';

export default class AccountHelpRoute extends Route {
  @service auth;

  async model () {
    return {
      user: await this.auth.user,
      articles
    };
  }

  setupController (controller, model) {
    controller.setProperties({
      model: model.articles,
      user:  model.user
    });
  }
}
