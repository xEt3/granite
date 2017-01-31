import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  notes:        attr('string'),
  didResolve:   attr('boolean'),
  nextFollowup: attr('date'),
  creator:      belongsTo('employee'),

  created: attr('date', {
    defaultValue: () => new Date()
  })
});
