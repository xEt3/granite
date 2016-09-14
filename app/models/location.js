import DS from 'ember-data';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default DS.Model.extend({

  name:  attr('string'),
  code:  attr('string'),
  phone: attr('string'),

  addressLine1:              attr('string'),
  addressLine2:              attr('string'),
  addressCity:               attr('string'),
  addressState:              attr('string'),
  addressZipcode:                attr('string'),

  company: belongsTo('company'),
  creator: belongsTo('company-user', { async: true, inverse: false }),

  created: attr('date', {
    defaultValue () {
      return new Date();
    }
  })
});
