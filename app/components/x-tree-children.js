import Component from '@ember/component';

export default Component.extend({
  tagName: 'li',
  classNames: ['tree-node'],

  didReceiveAttrs () {
    this._super(...arguments);
    this.recalculateState();
  },

  recalculateState () {
    console.log('recalculateStateAction in x-tree-children', this.get('model'));
    const children = this.get('model.children');

    if (children && children.length) {
      console.log('has children');
      const lengthSelected = children.filterBy('isChecked', true).length;

      console.log('children length', children.length);
      console.log('lengthSelected', lengthSelected);

      this.set('model.isChecked', lengthSelected > 0);
      this.set('model.isIndeterminate', lengthSelected > 0 && lengthSelected !== children.length);
    }

    if (this.get('recalculateStateAction')) {
      this.get('recalculateStateAction')();
    }
  }
});
