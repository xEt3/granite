import Component from '@ember/component';
import { computed } from '@ember/object';

const dictMap = [ 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten' ];

export default Component.extend({
  classNames: [ 'ui', 'steps' ],
  classNameBindings: [ 'dictStep' ],

  didReceiveAttrs () {
    this.set('_step', this.get('step'));
  },

  dictStep: computed('steps', function () {
    return dictMap[this.get('steps.length') - 1];
  })
});
