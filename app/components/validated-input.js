import Component from '@ember/component';
import { computed, defineProperty } from '@ember/object';

export default Component.extend({
  classNames:        [ 'validated-input' ],
  classNameBindings: [ 'showErrorClass:has-error', 'isValid:has-success' ],
  model:             null,
  value:             null,
  type:              'text',
  valuePath:         '',
  placeholder:       '',
  validation:        null,
  isTyping:          false,
  errs:              [],
  isDirty:           false,

  init () {
    this._super(...arguments);
    var valuePath = this.get('valuePath');
    defineProperty(this, 'validation', computed.oneWay(`model.validations.attrs.${valuePath}`));
    defineProperty(this, 'value', computed.alias(`model.${valuePath}`));
  },

  uniquePrefix: computed('errs.[]', 'hasContent', function () {
    let input = document.querySelector('#url-prefix input');

    if (this.get('errs') &&  this.get('errs').length >= 1) {
      let err = this.get('errs').find(element=> {
        if (element.detail === 'Duplicate URL Prefix') {
          return element;
        }
      });
      return err.val === input.value ? false : true;
    }
    return true;

  }),
  notValidating: computed.not('validation.isValidating'),
  didValidate:   computed.oneWay('target.didValidate'),
  hasContent:    computed.notEmpty('value'),
  isValid:       computed.and('hasContent', 'validation.isValid', 'notValidating', 'uniquePrefix'),
  isInvalid:     computed('validation.isInvalid', 'uniquePrefix', function () {
    return   !this.get('uniquePrefix') ? true : this.get('validation.isInvalid');

  }),
  showErrorClass: computed.and('notValidating', 'showMessage', 'validation'),
  showMessage:    computed('isDirty', 'isInvalid', 'didValidate', 'uniquePrefix', function () {
    console.log(this);
    return (this.get('isDirty') || this.get('didValidate')) && this.get('isInvalid');

  }),

  actions: {
    onChange () {
      this.set('isDirty', true);
    }
  }

});
