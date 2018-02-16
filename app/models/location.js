import DS from 'ember-data';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
import { computed } from '@ember/object';

export default DS.Model.extend({
  name:  attr('string'),
  code:  attr('string'),
  phone: attr('string'),

  addressLine1:   attr('string'),
  addressLine2:   attr('string'),
  addressCity:    attr('string'),
  addressState:   attr('string'),
  addressZipcode: attr('string'),

  company: belongsTo('company'),
  creator: belongsTo('company-user', { async: true, inverse: false }),

  phoneFormatted: computed('phone',function () {
    var phone = this.get('phone');
    return phone ? phone.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3') : phone;
  }),

  created: attr('date', {
    defaultValue () {
      return new Date();
    }
  })
});
