import Route from 'granite/core/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class AccountEmployeesRoute extends Route {
  @service ajax;

  async model () {
    let response = await this.ajax.request('/api/v1/changes', {
      data: {
        _count:     true,
        reviewedOn: { $not: { $type: 9 } }
      }
    });

    return { changeQueue: response && response.count };
  }

  @action
  refresher () {
    //gets used from change route to refresh change count
    this.refresh();
  }
}
