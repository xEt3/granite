import Component from '@ember/component';
import { computed, defineProperty } from '@ember/object';

export default Component.extend({
  classNames:        [ 'validated-input' ],
  classNameBindings: [ 'showErrorClass:has-error', 'isValid:has-success', 'dupPrefix:prefix-error' ],
  model:             null,
  value:             null,
  type:              'text',
  valuePath:         '',
  placeholder:       '',
  validation:        null,
  isTyping:          false,
  errs:              [],

  init () {
    this._super(...arguments);
    var valuePath = this.get('valuePath');
    defineProperty(this, 'validation', computed.oneWay(`model.validations.attrs.${valuePath}`));
    defineProperty(this, 'value', computed.alias(`model.${valuePath}`));
  },

  dupPrefix: computed('errs.[]', 'hasContent', function () {
    let input = document.querySelector('#url-prefix input');

    if (this.get('errs') &&  this.get('errs').length >= 1) {
      let err = this.get('errs').find(element=> {
        if (element.detail === 'duplicate URL Prefix') {
          return element;
        }
      });
      return err.val === input.value ? true : false;
    }
  }),
  notValidating:  computed.not('validation.isValidating'),
  didValidate:    computed.oneWay('target.didValidate'),
  hasContent:     computed.notEmpty('value'),
  isValid:        computed.and('hasContent', 'validation.isValid', 'notValidating'),
  isInvalid:      computed.oneWay('validation.isInvalid'),
  showErrorClass: computed.and('notValidating', 'showMessage', 'validation'),
  showMessage:    computed('validation.isDirty', 'isInvalid', 'didValidate', function () {
    return (this.get('validation.isDirty') || this.get('didValidate')) && this.get('isInvalid');
  })
});
