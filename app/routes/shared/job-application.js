import { inject as service } from '@ember/service';
import Route from 'granite/core/route';

export default class JobApplicationRoute extends Route {
  @service ajax;

  async model (params) {
    let response = await this.ajax.request(`/api/v1/job-application/shared/${params.sharing_id}`);

    if (!response) {
      return response;
    }

    this.store.pushPayload('job-application', response);

    return {
      jobApplication: await this.store.peekRecord('job-application', response.jobApplication.id),
      jobOpening:     response.jobOpening,
      screening:      response.screening,
      applicant:      response.applicant,
      resume:         response.resume
    };
  }
}
