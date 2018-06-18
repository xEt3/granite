import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default Route.extend({
  auth: service(),
  ajax: service(),

  model () {
    return hash({
      company: this.get('auth.user.company'),
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
  },

  afterModel (model) {
    const firstStepsCompleted = model.company.get('firstStepsCompleted');

    if (model.employeeCount && !firstStepsCompleted.includes('employees')) {
      firstStepsCompleted.addObject('employees');
    }

    if (model.locationCount && model.departmentCount && !firstStepsCompleted.includes('anatomy')) {
      firstStepsCompleted.addObject('anatomy');
    }

    if (firstStepsCompleted.length === 3) {
      model.company.set('firstStepsCompletedOn', new Date());
      // this.transitionTo('account');
    }

    if (model.company.get('hasDirtyAttributes')) {
      return model.company.save();
    }
  }
});
