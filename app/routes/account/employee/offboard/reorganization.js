import Route from 'granite/core/route';
import { inject as service } from '@ember/service';

const $or = [{ terminatedOn: { $exists: false } }, { terminatedOn: null }];

export default class AccountEmployeeOffboardReorganizationRoute extends Route {
  @service ajax
  titleToken = 'Reorganization'

  async model () {
    let employee = this.modelFor('account.employee.offboard'),
        select = 'name email supervisor';

    return {
      employee,
      employees: await this.store.query('employee', {
        select,
        $or,
        _id: { $ne: employee.id }
      }),
      hasDirectReports: await this.hasDirectReports(employee)
    };
  }

  async hasDirectReports (employee) {
    let res = await this.ajax.request('/api/v1/employees', {
      data: {
        $or,
        supervisor: employee.get('id'),
        select:     '_id'
      }
    });
    return res.employee && res.employee.length;
  }

  setupController (controller, model) {
    controller.setProperties({
      model:            model.employee,
      employees:        model.employees,
      hasDirectReports: model.hasDirectReports
    });
  }
}
