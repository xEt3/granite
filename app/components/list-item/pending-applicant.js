import BaseLiComponent from './base';
import { computed } from '@ember/object';
import { A } from '@ember/array';

export default BaseLiComponent.extend({
  classNameBindings: [ 'isSelected:is-selected' ],

  isSelected: computed('selected.[]', 'model', function () {
    return (this.get('selected') || A()).includes(this.get('model'));
  }),

  click (e) {
    if (e.target.className.indexOf('content__link') < 0) {
      e.preventDefault();
      this.send('select');
    }
  },

  actions: {
    select () {
      this.get('onSelectChange')(this.get('model'), this.get('isSelected'));
    }
  }
});
