import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  firstName:  attr('string'),
  middleName: attr('string'),
  lastName:   attr('string'),

  email:    attr('string'),
  password: attr('string'),

  company: belongsTo('company', { async: true, inverse: false }),

  created: attr('date', {
    defaultValue () {
      return new Date();
    }
  })
});
