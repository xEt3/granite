import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import { hash } from 'rsvp';

@classic
export default class ListsRoute extends Route {
  @service
  auth;

  titleToken = 'Lists';
  queryParams = { list: { refreshModel: true } };

  model (params) {
    let list = [],
        company = this.get('auth.user.company');

    if (params.list === 'dqReasons') {
      list = company.get('disqualificationReasons');
    }

    if (params.list === 'labels') {
      list = company.get('labels');
    }

    return hash({
      list,
      company
    });
  }

  setupController (controller, model) {
    controller.setProperties({
      model:   model.list,
      company: model.company
    });
  }
}
