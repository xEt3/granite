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

  get hasNoFieldError () {
    return !this.showFieldError;
  }
  @not('validation.isValidating') notValidating
  @notEmpty('value') hasContent
  @notEmpty('validation.warnings') hasWarnings
  @or('showValidations', 'didValidate', 'hasContent') shouldDisplayValidations
  @and('notValidating', 'showErrorMessage', 'hasContent', 'validation') showErrorClass
  @and('shouldDisplayValidations', 'validation.isInvalid') showErrorMessage
  @and('shouldDisplayValidations', 'hasWarnings', 'isValid') showWarningMessage

  get isValid () {
    return this.hasContent && (this.validation || {}).isTruelyValid && this.hasNoFieldError;
  }

  get showFieldError () {
    return this.args.fieldErrors ? this.args.fieldErrors[this.args.valuePath] : false;
  }

  constructor () {
    super(...arguments);
    let valuePath = this.args.valuePath;

    defineProperty(
      this,
      'validation',
      readOnly(`args.model.validations.attrs.${valuePath}`)
    );
    defineProperty(this, 'value', alias(`args.model.${valuePath}`));
  }

  @action
  focusOut () {
    this.showValidations = true;
  }
}
