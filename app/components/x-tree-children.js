import Component from '@ember/component';

export default Component.extend({
  tagName:    'li',
  classNames: [ 'tree-node' ],

  didReceiveAttrs () {
    this._super(...arguments);
    this.recalculateState();
  },

  recalculateState () {
    const children = this.get('model.children');

    if (children && children.length) {
      const lengthSelected = children.filterBy('isChecked', true).length;

      this.set('model.isChecked', lengthSelected > 0);
      this.set('model.isIndeterminate', lengthSelected > 0 && lengthSelected !== children.length);
    }

    if (this.get('recalculateStateAction')) {
      this.get('recalculateStateAction')();
    }
  }
});
