import Component from '@ember/component';
import {
  not,
  notEmpty,
  and,
  or,
  readOnly,
  alias
} from '@ember/object/computed';
import { defineProperty, computed } from '@ember/object';

export default Component.extend({
  classNames:        [ 'validated-input' ],
  classNameBindings: [ 'showErrorClass:has-error', 'isValid:has-success' ],
  model:             null,
  value:             null,
  type:              'text',
  valuePath:         '',
  placeholder:       '',
  validation:        null,
  showValidations:   false,
  didValidate:       false,

  hasNoFieldError:          not('showFieldError'),
  notValidating:            not('validation.isValidating').readOnly(),
  hasContent:               notEmpty('value').readOnly(),
  hasWarnings:              notEmpty('validation.warnings').readOnly(),
  isValid:                  and('hasContent', 'validation.isTruelyValid', 'hasNoFieldError').readOnly(),
  shouldDisplayValidations: or(
    'showValidations',
    'didValidate',
    'hasContent'
  ).readOnly(),

  showErrorClass: and(
    'notValidating',
    'showErrorMessage',
    'hasContent',
    'validation'
  ).readOnly(),
  showErrorMessage: and(
    'shouldDisplayValidations',
    'validation.isInvalid'
  ).readOnly(),
  showWarningMessage: and(
    'shouldDisplayValidations',
    'hasWarnings',
    'isValid'
  ).readOnly(),

  init () {
    this._super(...arguments);
    let valuePath = this.get('valuePath');

    defineProperty(
      this,
      'validation',
      readOnly(`model.validations.attrs.${valuePath}`)
    );
    defineProperty(this, 'value', alias(`model.${valuePath}`));
    defineProperty(this, 'showFieldError', computed(`fieldErrors.${valuePath}`, function () {
      return this.get(`fieldErrors.${valuePath}`);
    }));
  },

  focusOut () {
    this._super(...arguments);
    this.set('showValidations', true);
  }
});
