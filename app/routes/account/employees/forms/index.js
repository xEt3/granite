import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

@classic
export default class IndexRoute extends Route {
  @service
  ajax;

  model() {
    return this.ajax.request('/api/v1/forms?$report=responseGroups');
  }
}
