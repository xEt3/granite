import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';
import { scheduleOnce, later } from '@ember/runloop';

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
    let change = false;

    if (model.employeeCount && !firstStepsCompleted.includes('employees')) {
      firstStepsCompleted.addObject('employees');
      change = true;
    }

    if (model.locationCount && model.departmentCount && !firstStepsCompleted.includes('anatomy')) {
      firstStepsCompleted.addObject('anatomy');
      change = true;
    }

    if (firstStepsCompleted.length === 3) {
      model.company.set('firstStepsCompletedOn', new Date());
      change = true;
    }

    if (!change) {
      return;
    }

    return model.company.save()
    .then(company => {
      if (!company.get('firstStepsCompletedOn')) {
        return;
      }

      scheduleOnce('afterRender', () => {
        later(() => this.transitionTo('account.index'), 4300);
      });
    });
  }
});
