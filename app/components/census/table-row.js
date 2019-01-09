import Component from '@ember/component';
import { computed } from '@ember/object';
import { A } from '@ember/array';

export default Component.extend({
  tagName:           'tr',
  classNameBindings: [ 'isInvalid:census__highlight-row' ],

  init () {
    this._super(...arguments);
    this.set('validationStates', A());
  },

  isInvalid: computed('validationStates.[]', function () {
    console.log('validationStates:', this.get('validationStates'));
    return this.get('validationStates').some(Boolean);
  }),

  actions: {
    onChildValidationChange (index, value) {
      this.set(`validationStates.${index}`, value);
      console.log('just set validationStates:', this.get('validationStates'));
      // this.set('isInvalid', this.get('validationStates').some(Boolean));
    }
  }


  //CHECK CHILD NODES FOR CLASS census__flagged-cell
  // THEN GIVE ROW CLASS census__highlight-row
});
