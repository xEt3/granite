import { inject as service } from '@ember/service';
import Route from 'granite/core/route';

export default class IndexRoute extends Route {
  @service ajax;

  model () {
    return this.ajax.request('/api/v1/forms?$report=responseGroups');
  }
}
