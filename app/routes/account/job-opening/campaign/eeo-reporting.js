import { inject as service } from '@ember/service';
import Route from 'granite/core/route';

export default class EeoReportingRoute extends Route {
  @service ajax;

  titleToken = 'EEO Report';

  model () {
    const jobOpening = this.modelFor('account.job-opening');

    return this.ajax.request('/api/v1/job-applications/', {
      data: {
        $report:    'eeo',
        jobOpening: jobOpening.id
      }
    });
  }
}
