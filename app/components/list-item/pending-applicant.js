import Ember from 'ember';
import BaseLiComponent from './base';

const { A, computed } = Ember;

export default BaseLiComponent.extend({
  classNameBindings: [ 'isSelected:is-selected' ],

  isSelected: computed('selected.[]', 'model', function () {
    return (this.get('selected') || A()).includes(this.get('model'));
  }),

  click (e) {
    e.preventDefault();
    this.send('select');
  },

  actions: {
    select () {
      this.get('onSelectChange')(this.get('model'), this.get('isSelected'));
    }
  }
});
