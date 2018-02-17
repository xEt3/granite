import Controller from '@ember/controller';
import { computed, get } from '@ember/object';
import { A } from '@ember/array';

const attendeeKeys = [ 'facilitator', 'organizer', 'attendees', 'attendant' ];

export default Controller.extend({
  attendees: computed('model.{facilitator.id,organizer.id,attendees.[],attendant.id}', function () {
    const event = this.get('model');

    return attendeeKeys.reduce((attendees, k) => {
      const keyIsArray = k === 'attendees',
            value = event.get(k);

      if (!keyIsArray && value && get(value, 'id')) {
        attendees.addObject({
          type: k,
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
  })
});
