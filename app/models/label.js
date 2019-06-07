import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  color: attr('string'),
  text:  attr('string'),

  created: attr('date', { defaultValue: () => new Date() })
});
