import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

@classic
export default class SearchRoute extends Route {
  @service
  search;

  queryParams = { q: { refreshModel: true } };
  titleToken = 'Search Results';

  model({ q }) {
    return this.search.performSearch(q);
  }
}
