import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  ajax:       service(),
  titleToken: 'EEO Report',

  model () {
    const jobOpening = this.modelFor('account.job-opening');

    // let fakeData = [
    //   [ 'Type', 'All', 'Reviewed', 'Not Reviewed', 'Disqualified', 'Sample Stage 1', 'Sample Stage 2', 'Hired' ],
    //   { section: 'Race/Gender EEO Data' },
    //   [ 'Male', 5, 2, 3, 1, 0, 2, 1 ],
    //   [ 'Female', 5, 2, 3, 1, 0, 2, 1 ],
    //   [ 'White', 1, 2, 3, 4, 5, 6, 7 ],
    //   { section: 'Section Two' },
    //   [ 'A', 1, 2, 3, 4, 5, 6, 7 ]
    // ];
    //
    // return fakeData;
    return this.ajax.request('/api/v1/job-applications/', {
      data: {
        $report:    'eeo',
        jobOpening: jobOpening.id
      }
    });
  }
});
