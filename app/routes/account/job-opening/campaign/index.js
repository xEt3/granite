import Ember from 'ember';
import moment from 'moment';

const { Route, A, inject: { service } } = Ember;

export default Route.extend({
  ajax: service(),

  model () {
    const ajax = this.get('ajax'),
          jobOpening = this.modelFor('account.job-opening');

    return ajax.request(`/api/v1/job-openings/${jobOpening.get('id')}?$report=summary`)
    .then(results => {
      const _results = A(results);
      return {
        labels: _results.map(x => moment(x._id).format('M/D/YY')),
        datasets: [{
          label: "Total Applied",
          data: _results.mapBy('total').toArray(),
          fill: false,
          backgroundColor: 'rgb(255, 128, 102)',
          borderColor: 'rgb(255, 128, 102)',
        }, {
          label: "Total Reviewed",
          data: _results.mapBy('totalReviewed').toArray(),
          fill: false,
          backgroundColor: 'rgb(44, 195, 147)',
          borderColor: 'rgb(44, 195, 147)'
        }]
      };
    });
  }
});
