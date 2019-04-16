import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  auth: service(),

  titleToken: 'Lists',

  queryParams: { list: { refreshModel: true } },

  model (params) {
    if (params.list === 'dqReasons') {
      return this.get('auth.user.company.disqualificationReasons');
    }
    return [];
  }
});
