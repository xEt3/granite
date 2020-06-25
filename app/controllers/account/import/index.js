import Controller from 'granite/core/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class AccountImportController extends Controller {
  @service ajax
  @service data

  queryParams = [ 'service' ];
  service = null;

  @action
  async discover () {
    let { success, error } = this.data.createStatus();

    const serviceName = this.service;

    try {
      let response = await this.ajax.request(`/api/v1/integrations/${serviceName}/discover-import`);
      success(null, true);
      this.transitionToRoute('account.import.discovered', response, { queryParams: { service: serviceName } });
    } catch (e) {
      error(e);
    }
  }
}
