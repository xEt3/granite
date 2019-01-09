import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName:           'tr',
  classNameBindings: [ 'isInvalid:census__highlight-row' ],

  isInvalid: computed('validation.[]', function () {
    let v = this.get('validation');
    return v && v.some((cell = {}) => cell.invalid);
  })
});
