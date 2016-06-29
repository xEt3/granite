import { validator, buildValidations } from 'ember-cp-validations';

export default buildValidations({
  title: [
    validator('presence', true),
    validator('length', {
      min: 3
    })
  ]
});
