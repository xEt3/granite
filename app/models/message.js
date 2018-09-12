import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  content: attr('string'),

  from:          hasMany('employee'),
  file:          belongsTo('file'),
  messageThread: belongsTo('messageThread'),
  company:       belongsTo('company'),

  created: attr('date', { defaultValue: () => new Date() })
});
