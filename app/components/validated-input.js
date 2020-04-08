import Component from '@glimmer/component';
import {
  not,
  notEmpty,
  and,
  or,
  readOnly,
  alias
} from '@ember/object/computed';
import { defineProperty, action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ValidatedInputComponent extends Component {
  value =             null
  validation =        null
  didValidate =       false

  @tracked showValidations = false

  @not('showFieldError') hasNoFieldError
  @not('validation.isValidating') notValidating
  @notEmpty('value') hasContent
  @notEmpty('validation.warnings') hasWarnings
  @and('hasContent', 'validation.isTruelyValid', 'hasNoFieldError') isValid
  @or('showValidations', 'didValidate', 'hasContent') shouldDisplayValidations
  @and('notValidating', 'showErrorMessage', 'hasContent', 'validation') showErrorClass
  @and('shouldDisplayValidations', 'validation.isInvalid') showErrorMessage
  @and('shouldDisplayValidations', 'hasWarnings', 'isValid') showWarningMessage

  constructor () {
    super(...arguments);
    let valuePath = this.args.valuePath;

    defineProperty(
      this,
      'validation',
      readOnly(`args.model.validations.attrs.${valuePath}`)
    );
    defineProperty(this, 'value', alias(`args.model.${valuePath}`));

    //I DONT THINK FIELDERRORS IS A THING?
    // defineProperty(this, 'showFieldError', computed(`fieldErrors.${valuePath}`, function () {
    //   return this.get(`fieldErrors.${valuePath}`);
    // }));
  }

  @action
  focusOut () {
    this.showValidations = true;
  }
}
