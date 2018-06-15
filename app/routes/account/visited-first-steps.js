import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default Route.extend({
  ajax: service(),

  model () {
    return hash({
      employeeCount: this.get('ajax').request('/api/v1/employees', {
        data: {
          _count: true,
          terminatedOn: { $not: { $type: 9 } }
        }
      }).then(response => response && response.count),

      locationCount: this.get('ajax').request('/api/v1/locations', {
        data: {
          _count: true,
          name: { $not: { $type: 10 } }
        }
      }).then(response => response && response.count),

      departmentCount: this.get('ajax').request('/api/v1/departments', {
        data: {
          _count: true,
          name: { $not: { $type: 10 } }
        }
      }).then(response => response && response.count)
    });
  }
});
