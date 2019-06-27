import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import moment from 'moment';

export default Route.extend({
  ajax: service(),

  queryParams: { granularity: { refreshModel: true } },

  async model (params) {
    let data = await this.ajax.request('/api/v1/training-assignments', {
      data: {
        $report: 'trainingBurndown',
        range:   params.granularity
      }
    });

    return {
      data: {
        labels:   [],
        datasets: [{
          label:                  'Completed',
          data:                   data.completed,
          type:                   'line',
          backgroundColor:        'rgba(30, 212, 154, .4)',
          borderColor:            '#1ED49A',
          cubicInterpolationMode: 'monotone'
        }, {
          label:                  'Assigned',
          data:                   data.assigned,
          type:                   'line',
          backgroundColor:        'rgba(34, 134, 196, .8)',
          borderColor:            '#2286C4',
          cubicInterpolationMode: 'monotone'

        }]
      },
      options: {
        legend:   { position: 'bottom' },
        tooltips: {
          intersect: false,
          mode:      'index',
          callbacks: {
            title (set) {
              return moment((set[0] || {}).xLabel).format('MMM YYYY');
            }
          }
        },
        scales: {
          xAxes: [{
            type:         'time',
            distribution: 'series',
            time:         { unit: 'month' },
            ticks:        {
              source:   'data',
              autoSkip: true
            }
          }]
        }
      }
    };
  }
});
