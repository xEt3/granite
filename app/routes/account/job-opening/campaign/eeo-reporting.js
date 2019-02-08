import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  ajax:       service(),
  titleToken: 'EEO Report',

  model () {
    const jobOpening = this.modelFor('account.job-opening');

    return this.ajax.request('/api/v1/job-applications/', {
      data: {
        $report:    'eeo',
        jobOpening: jobOpening.id
      }
    });
  }
});
