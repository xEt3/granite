import BaseValidator from 'ember-cp-validations/validators/base';

const URLPrefix = BaseValidator.extend({
  validate (value/*, options, model, attribute*/) {
    if (!value) {
      return true;
    }

    if (value.includes(' ')) {
      return 'This field cannot contain spaces.';
    }

    if (/\W/.test(value)) {
      return 'This field contains invalid characters.';
    }

    return true;
  }
});

// URLPrefix.reopenClass({
//   /**
//    * Define attribute specific dependent keys for your validator
//    *
//    * [
//    * 	`model.array.@each.${attribute}` --> Dependent is created on the model's context
//    * 	`${attribute}.isValid` --> Dependent is created on the `model.validations.attrs` context
//    * ]
//    *
//    * @param {String}  attribute   The attribute being evaluated
//    * @param {Unknown} options     Options passed into your validator
//    * @return {Array}
//    */
//   getDependentsFor (/* attribute, options */) {
//     return [];
//   }
// });

export default URLPrefix;
