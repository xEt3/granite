import Ember from 'ember';

const { Controller, computed } = Ember;

export default Controller.extend({
  summaryOpts: {
    legend: {
      position: 'bottom'
    }
  }
});
