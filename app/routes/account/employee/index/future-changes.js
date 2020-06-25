import Route from 'granite/core/route';
import moment from 'moment';

export default class AccountEmployeeFutureChangesRoute extends Route {
  titleToken = 'Future Changes';

  async model () {
    let employee = this.modelFor('account.employee');
    return {
      pendingChanges: await this.store.query('history', {
        'targetId':    employee.id,
        'effectiveOn': { $gt: moment().add(1, 'minute').toDate() }
      })
    };
  }

  setupController (controller, model) {
    controller.setProperties({ model: model.pendingChanges });
  }
}
