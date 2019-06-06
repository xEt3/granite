import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  status:      attr('string'),
  name:        attr('string'),
  description: attr('string'),
  result:      attr(),
  error:       attr('string'),
  running:     attr('boolean'),
  context:     attr(),

  company: belongsTo('company', {
    inverse: null,
    async:   true
  }),

  updated: Date,
  created: attr('date')
});
