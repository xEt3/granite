import { validator, buildValidations } from 'ember-cp-validations';

export default buildValidations({
  name: [
    validator('presence', true),
    validator('length', {
      min: 2
    })
  ],

  contactPhone: [
    validator('presence', true)
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

  addressState: [
    validator('presence', true)
  ],

  addressZipCode: [
    validator('presence', true),
    validator('length', {
      is: 5
    })
  ],

  urlPrefix: [
    validator('presence', true),
    validator('length', {
      max: 45
    })
  ]
});
