import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  color: attr('array'),
  text:  attr('string'),

  created: attr('date', { defaultValue: () => new Date() })
});
