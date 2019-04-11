import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  name:   attr('string'),
  note:   attr('string'),
  status: attr('string', { defaultValue: 'Assigned' }),

  company:  belongsTo('company'),
  creator:  belongsTo('employee'),
  employee: belongsTo('employee'),

  created: attr('date', {
    defaultValue () {
      return new Date();
    }
  })
});
