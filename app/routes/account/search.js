import { inject as service } from '@ember/service';
import Route from 'granite/core/route';

export default class SearchRoute extends Route {
  @service search
  queryParams = { q: { refreshModel: true } }
  titleToken = 'Search Results'

  model ({ q }) {
    return this.search.performSearch(q);
  }

  resetController (controller, isExiting) {
    if (isExiting) {
      controller.set('q', null);
    }
  }
}
