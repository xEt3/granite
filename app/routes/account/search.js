import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  search: service(),

  queryParams: { q: { refreshModel: true } },

  model ({ q }) {
    return this.get('search').performSearch(q);
  }
});
