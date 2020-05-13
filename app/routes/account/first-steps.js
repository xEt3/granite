import { inject as service } from '@ember/service';
import Route from 'granite/core/route';
import { scheduleOnce, later } from '@ember/runloop';

export default class FirstStepsRoute extends Route {
  @service auth;

  @service ajax;

  titleToken = 'First Steps';

  async model () {
    let { count: employeeCount } = await this.ajax.request('/api/v1/employees', {
      data: {
        _count:       true,
        terminatedOn: { $not: { $type: 9 } }
      }
    });

    let { count: locationCount } = await this.ajax.request('/api/v1/locations', {
      data: {
        _count: true,
        name:   { $not: { $type: 10 } }
      }
    });

    let { count: departmentCount } = await this.ajax.request('/api/v1/departments', {
      data: {
        _count: true,
        name:   { $not: { $type: 10 } }
      }
    });

    return {
      company: await this.get('auth.user.company'),
      employeeCount,
      locationCount,
      departmentCount
    };
  }

  async afterModel (model) {
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

    let company = model.company;
    await company.save();

    if (!company.firstStepsCompletedOn) {
      return;
    }
    scheduleOnce('afterRender', () => {
      later(() => this.transitionTo('account.index'), 4300);
    });
  }
}
