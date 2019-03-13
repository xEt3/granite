import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import resolveForTypeKey from '../utils/resolve-for-type-key';

export default Model.extend({
  start:       attr('date'),
  end:         attr('date'),
  title:       attr('string'),
  description: attr('string'),
  notes:       attr('string'),

  company:       belongsTo('company', { inverse: null }),
  creator:       belongsTo('employee', { inverse: null }),
  organizer:     belongsTo('employee', { inverse: null }),
  facilitator:   belongsTo('employee', { inverse: null }),
  attendees:     hasMany('employee'),
  attendantType: attr('string'),
  attendantId:   attr('string'),
  contextType:   attr('string'),
  contextId:     attr('string'),

  skipAttendeeNotification: attr('boolean', { defaultValue: false }),

  created: {
    type:    Date,
    default: Date.now,
    index:   true
  },

  attendant: resolveForTypeKey('attendant'),
  context:   resolveForTypeKey('context')
});
