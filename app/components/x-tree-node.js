import classic from 'ember-classic-decorator';
import { classNameBindings, layout as templateLayout } from '@ember-decorators/component';
import { action, computed } from '@ember/object';
import Component from '@ember/component';
import layout from '../templates/components/x-tree-node';

@classic
@templateLayout(layout)
@classNameBindings('model.isSelected:tree-highlight', 'isChosen:tree-chosen')
export default class XTreeNode extends Component {
  @computed('model.id', 'chosenId')
  get isChosen() {
    return this.get('model.id') === this.get('chosenId');
  }

  recalculateState() {
    if (this.get('recalculateStateAction')) {
      this.get('recalculateStateAction')();
    }
  }

  click() {
    let select = this.get('select');
    if (select) {
      select(this.get('model'));
    }
  }

  mouseEnter() {
    this.set('model.isSelected', true);
    let hover = this.get('hover');
    if (hover) {
      hover(this.get('model'));
    }
  }

  mouseLeave() {
    this.set('model.isSelected', false);
    let hoverOut = this.get('hoverOut');
    if (hoverOut) {
      hoverOut(this.get('model'));
    }
  }

  setChildCheckboxesRecursively(parentNode, checkValue) {
    const children = parentNode.children || [];

    if (children.length) {
      children.setEach('isChecked', checkValue);
      children.forEach((child) => {
        this.setChildCheckboxesRecursively(child, checkValue);
      });
    }
  }

  @action
  toggleCheck() {
    if (this.get('model.children.length')) {
      this.setChildCheckboxesRecursively(this.get('model'), this.get('model.isChecked'));
    }

    this.recalculateState();
  }

  @action
  toggleExpand() {
    this.toggleProperty('model.isExpanded');
  }
}
