import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: [ 'granularity' ],
  granularity: 'last 12 months',

  granularities: [{
    label: 'Last Year',
    value: 'last 12 months'
  }, {
    label: 'This Year',
    value: 'this year'
  }, {
    label: 'Last Calendar Year',
    value: 'last year'
  }, {
    label: 'Last 6 Months',
    value: 'last 6 months'
  }, {
    label: 'This month',
    value: 'this month'
  }, {
    label: 'Last 7 Days',
    value: 'last 7 days'
  }, {
    label: 'Last Week',
    value: 'last week'
  }, {
    label: 'This Week',
    value: 'this week'
  }]
});
