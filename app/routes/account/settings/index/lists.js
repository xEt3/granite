import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import { inject as service } from '@ember/service';

export default Route.extend({
  auth: service(),

  titleToken: 'Lists',

  queryParams: { list: { refreshModel: true } },

  model (params) {
    let list = [],
        company = this.get('auth.user.company');

    if (params.list === 'dqReasons') {
      list = company.get('disqualificationReasons');
    }
    return hash({
      list,
      company
    });
  },

  setupController (controller, model) {
    controller.setProperties({
      model:   model.list,
      company: model.company
    });
  }
});
