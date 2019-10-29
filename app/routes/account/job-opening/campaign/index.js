import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import moment from 'moment';

export default Route.extend({
  titleToken: 'Summary',
  ajax:       service(),

  async model () {
    const ajax = this.get('ajax'),
          jobOpening = this.modelFor('account.job-opening');

    let _results = A(await ajax.request(`/api/v1/job-openings/${jobOpening.get('id')}?$report=summary`));
    let chart = _results && _results.length > 0 ? {
      labels:   _results.map(x => moment(x._id).format('M/D/YY')),
      datasets: [{
        label:           'Total Applied',
        data:            _results.mapBy('total').toArray(),
        fill:            false,
        backgroundColor: 'rgb(255, 128, 102)',
        borderColor:     'rgb(255, 128, 102)'
      }, {
        label:           'Total Reviewed',
        data:            _results.mapBy('totalReviewed').toArray(),
        fill:            false,
        backgroundColor: 'rgb(44, 195, 147)',
        borderColor:     'rgb(44, 195, 147)'
      }].toArray()
    } : false;

    return {
      chart,
      jobOpening
    };
  },

  setupController (controller, model) {
    controller.setProperties({
      model:      model.chart,
      jobOpening: model.jobOpening
    });
  }
});
