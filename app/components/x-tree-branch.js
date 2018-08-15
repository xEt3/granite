import Component from '@ember/component';
import layout from '../templates/components/x-tree-branch';

export default Component.extend({
  layout,
  tagName: 'ul',
  classNames: ['tree-branch'],

  recalculateState () {
    console.log('recalculateStateAction in x-tree-branch', this.get('model'));

    if (this.get('recalculateStateAction')) {
      this.get('recalculateStateAction')();
    }
  }
});
