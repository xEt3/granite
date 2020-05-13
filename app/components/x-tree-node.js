import Component from '@glimmer/component';
import { action } from '@ember/object';
import layout from '../templates/components/x-tree-node';

export default class XTreeNode extends Component {
  layout = layout

  get isChosen () {
    return this.args.model.id === this.args.chosenId;
  }

  @action
  recalculateState () {
    if (this.args.recalculateStateAction) {
      this.args.recalculateStateAction();
    }
  }

  @action
  click () {
    console.log('inside click');
    let select = this.args.select;
    if (select) {
      select(this.args.model);
    }
  }

  @action
  mouseEnter () {
    console.log('yes');
    this.args.model.isSelected = true;
    let hover = this.args.hover;
    if (hover) {
      hover(this.args.model);
    }
  }

  @action
  mouseLeave () {
    this.args.model.isSelected = false;
    let hoverOut = this.args.hoverOut;
    if (hoverOut) {
      hoverOut(this.args.model);
    }
  }

  @action
  setChildCheckboxesRecursively (parentNode, checkValue) {
    const children = parentNode.children || [];

    if (children.length) {
      children.setEach('isChecked', checkValue);
      children.forEach((child) => {
        this.setChildCheckboxesRecursively(child, checkValue);
      });
    }
  }

  @action
  toggleCheck () {
    console.log('this.args.model:', this.args.model);
    if (this.args.model.children && this.args.model.children.length) {
      this.setChildCheckboxesRecursively(this.args.model, this.args.model.isChecked);
    }

    this.recalculateState();
  }
}
