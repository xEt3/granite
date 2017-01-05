import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  label: attr('string'),
  type: attr('string'),
  options: attr('array'),

  allowAdditions: attr('boolean'),
  multiple: attr('boolean'),

  created: attr('date', {
    defaultValue: () => new Date()
  })
});
