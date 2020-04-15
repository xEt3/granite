import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import refreshable from 'granite/mixins/refreshable';

@classic
export default class EmployeesRoute extends Route.extend(refreshable) {
  @service
  ajax;

  model() {
    return hash({
      changeQueue: this.ajax.request('/api/v1/changes', {
        data: {
          _count:     true,
          reviewedOn: { $not: { $type: 9 } }
        }
      }).then(response => response && response.count)
    });
  }
}
