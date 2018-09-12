import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  key:           attr('string'),
  title:         attr('string'),
  description:   attr('string'),
  availableData: attr('array'),
  contentKeys:   attr('array'),
  isRenderable:  attr('boolean'),
  category:      attr('string'),

  created: attr('date', { defaultValue: () => new Date() })
});
