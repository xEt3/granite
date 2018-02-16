import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: [ 'sg__color', 'col-md-2' ],
  classNameBindings: [ 'computedClassName' ],

  computedClassName: computed('color', function () {
    return 'sg__color-' + this.get('color');
  })
});
