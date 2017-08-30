import Ember from 'ember';
import BaseLiComponent from './base';

const { A, computed, get } = Ember;

export default BaseLiComponent.extend({
  classNames: [ 'event' ],

  attendeeCount: computed('model.attendees.[]', 'model.facilitator', function () {
    const {
      attendees,
      facilitator
    } = this.get('model').getProperties('attendees', 'facilitator');

    const attendeesLength = get(attendees || [], 'length'),
          includeFacilator = facilitator && !(attendees || A()).findBy('id', facilitator.get('id'));

    return (attendeesLength + (includeFacilator ? 1 : 0)) || 0;
  })
});
