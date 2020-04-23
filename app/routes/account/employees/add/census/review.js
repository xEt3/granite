import Route from 'granite/core/route';
import { inject as service } from '@ember/service';

export default class AccountEmployeesAddCensusReviewRoute extends Route {
  @service ajax;

  async model ({ uploadId }) {
    let fileData = await this.ajax.request(`/api/v1/employee/census/${uploadId}`);

    return {
      fileData,
      potentialData: await this.ajax.post(`/api/v1/employee/census/${uploadId}/dryrun`, { data: { headerMap: fileData.data[0] } })
    };
  }

  setupController (controller, model) {
    super.setupController(...arguments);
    controller.setProperties({
      displayDryRunResults: null,
      model:                model.fileData || model,
      potentialData:        model.potentialData
    });
  }
}
