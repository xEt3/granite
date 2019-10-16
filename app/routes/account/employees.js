import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';
import refreshable from 'granite/mixins/refreshable';

export default Route.extend(refreshable, {
  ajax: service(),

  model () {
    return hash({
      changeQueue: this.get('ajax').request('/api/v1/changes', {
        data: {
          _count:     true,
          reviewedOn: { $not: { $type: 9 } }
        }
      }).then(response => response && response.count)
    });
  }
});
