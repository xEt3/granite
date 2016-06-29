import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import Validations from './validations/company';

export default Model.extend(Validations, {
  name:  attr('string'),
  email: attr('string'),

  addressLine1:   attr('string'),
  addressLine2:   attr('string'),
  addressCity:    attr('string'),
  addressState:   attr('string'),
  addressZipCode: attr('string'),

  contactPhone:      attr('string'),
  contactExtension:  attr('string'),
  contactFirstName:  attr('string'),
  contactMiddleName: attr('string'),
  contactLastName:   attr('string'),

  urlPrefix: attr('string')
});
