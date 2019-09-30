import { validator, buildValidations } from 'ember-cp-validations';

export default buildValidations({
  label: [ validator('presence', {
    presence: true,
    message:  '"Question" is required for questions'
  }) ],
  type: [ validator('presence', {
    presence: true,
    message:  '"Answer Type" is required for questions'
  }) ]
});
