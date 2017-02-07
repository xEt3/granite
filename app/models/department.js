import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';


export default Model.extend({
  name: attr('string'),
  code: attr('string'),

  company: belongsTo('company'),
  creator: belongsTo('company-user', { async: true, inverse: null }),

  created: attr('date', {
    defaultValue () {
      return new Date();
    }
  })
});
