import Model from 'ember-data/model';
import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  name: [
    validator('presence', true),
    validator('length', {
      min: 2
    })
  ],

  contactFirstName: [
    validator('presence', true)
  ],

  contactLastName: [
    validator('presence', true),
    validator('length', {
      min: 2
    })
  ],

  email: [
    validator('presence', true),
    validator('format', { type: 'email' })
  ],

  addressLine1: [
    validator('presence', true),
    validator('length', {
      min: 2
    })
  ],

  addressCity: [
    validator('presence', true),
    validator('length', {
      min: 2
    })
  ],

  addressZipCode: [
    validator('presence', true),
    validator('length', {
      is: 5
    })
  ]
});

var attr = DS.attr;

export default Model.extend(Validations, {
  name: attr('string'),
  email: attr('string'),
  addressLine1: attr('string'),
  addressLine2: attr('string'),
  addressCity: attr('string'),
  addressState: attr('string'),
  addressZipCode: attr('string'),
  contactPhone: attr('string'),
  contactExtension: attr('string'),
  contactFirstName: attr('string'),
  contactMiddleName: attr('string'),
  contactLastName: attr('string')
});
