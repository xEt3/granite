import { validator, buildValidations } from 'ember-cp-validations';

export default buildValidations({
  firstName: [
    validator('presence', true),
    validator('length', {
      min: 2
    })
  ],

  lastName: [
    validator('presence', true),
    validator('length', {
      min: 2
    })
  ],

  // emergencyContactFirstName: [
  //   validator('presence', true)
  // ],
  //
  // emergencyContactLastName: [
  //   validator('presence', true)
  // ],

  phone: [
    validator('presence', true),
    validator('format', { type: 'phone' })
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

  addressZip: [
    validator('presence', true),
    validator('length', {
      is: 5
    })
  ],

  ssn: [
    validator('presence', true),
    validator('length', {
      is: 9
    })
  ],

  jobTitle: [
    validator('presence', true),
    validator('length', {
      min: 2
    })
  ],

  hireDate: [
    validator('presence', true)
  ]
});
