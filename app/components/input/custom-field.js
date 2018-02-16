import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: [ 'field' ],

  inputId: computed('elementId', 'attribute', function () {
    return this.get('elementId') + '-' + this.get('attribute');
  }),

  placeholder: computed('attribute', function () {
    return this.get('attribute') + ' value';
  })
});
