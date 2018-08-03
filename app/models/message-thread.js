import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  between: hasMany('employee'),
  company: belongsTo('company'),
  creator: belongsTo('employee'),

  created: attr('date', {
    defaultValue: () => new Date()
  })
});
