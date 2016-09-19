import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  text: attr('string'),
  commenter: belongsTo('company-user', { inverse: false }),

  created: attr('date', {
    defaultValue: () => new Date()
  })
});