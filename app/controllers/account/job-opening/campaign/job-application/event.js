import classic from 'ember-classic-decorator';
import Controller from '@ember/controller';
import { get, computed } from '@ember/object';
import { A } from '@ember/array';

const attendeeKeys = [ 'facilitator', 'organizer', 'attendees', 'attendant' ];

@classic
export default class EventController extends Controller {
  @computed('model.{facilitator.id,organizer.id,attendees.[],attendant.id}')
  get attendees () {
    const event = this.model;

    return attendeeKeys.reduce((attendees, k) => {
      const keyIsArray = k === 'attendees',
            value = event.get(k);

      if (!keyIsArray && value && get(value, 'id')) {
        attendees.addObject({
          type:   k,
          person: value
        });
      } else if (keyIsArray && value && get(value, 'length') > 0) {
        value.forEach(person => attendees.addObject({
          person,
          type: 'attendee'
        }));
      }

      return attendees;
    }, A());
  }
}
