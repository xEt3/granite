import Ember from 'ember';
import moment from 'moment';

const { Controller, computed } = Ember;

export default Controller.extend({
  upcomingEvents: computed.filter('events', function (event) {
    return moment().isBefore(event.get('start'));
  }),

  pastEvents: computed.filter('events', function (event) {
    return moment().isAfter(event.get('start'));
  })
});
