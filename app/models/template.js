import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  key: attr('string'),
  content: attr(),
  isRenderable: attr('boolean'),

  company: belongsTo('company', { inverse: null }),
  creator: belongsTo('employee', { inverse: null }),

  created: attr('date', {
    defaultValue: () => new Date()
  })
});
