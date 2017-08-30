import Ember from 'ember';
import moment from 'moment';
import modalSupport from 'granite/mixins/modal-support';

const { Controller, computed } = Ember;

export default Controller.extend(modalSupport, {
  upcomingEvents: computed.filter('events', function (event) {
    return moment().isBefore(event.get('start'));
  }),

  pastEvents: computed.filter('events', function (event) {
    return moment().isAfter(event.get('start'));
  })
});
