import { computed, get } from '@ember/object';
import { A } from '@ember/array';
import BaseLiComponent from './base';

export default BaseLiComponent.extend({
  classNames: [ 'event' ],

  attendeeCount: computed('model.{facilitator, attendees.[]}', function () {
    const {
      attendees,
      facilitator,
      attendantId
    } = this.get('model').getProperties('attendees', 'facilitator', 'attendantId');

    const attendeesLength = get(attendees || [], 'length'),
          includeFacilator = facilitator && !(attendees || A()).findBy('id', facilitator.get('id'));

    return (attendeesLength + (includeFacilator ? 1 : 0) + (attendantId ? 1 : 0)) || 0;
  })
});
