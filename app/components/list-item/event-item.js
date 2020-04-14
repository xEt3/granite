import classic from 'ember-classic-decorator';
import { classNames } from '@ember-decorators/component';
import { get, computed } from '@ember/object';
import { A } from '@ember/array';
import BaseLiComponent from './base';

@classic
@classNames('event')
export default class EventItem extends BaseLiComponent {
  @computed('model.{facilitator,attendees.[]}')
  get attendeeCount() {
    const {
      attendees,
      facilitator,
      attendantId
    } = this.get('model').getProperties('attendees', 'facilitator', 'attendantId');

    const attendeesLength = get(attendees || [], 'length'),
          includeFacilator = facilitator && !(attendees || A()).findBy('id', facilitator.get('id'));

    return attendeesLength + (includeFacilator ? 1 : 0) + (attendantId ? 1 : 0) || 0;
  }
}
