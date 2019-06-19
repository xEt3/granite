import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  completedOn: attr('date'),
  document:    belongsTo('file', {
    async:   true,
    inverse: null
  })
});
