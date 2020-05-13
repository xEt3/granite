import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class XTreeChildrenComponent extends Component {
  constructor () {
    super(...arguments);
    this.recalculateState();
  }

  @action
  recalculateState () {
    const children = this.args.model.children;

    if (children && children.length) {
      const lengthSelected = children.filterBy('isChecked', true).length;

      this.args.model.isChecked = lengthSelected > 0;
      this.args.model.isIndeterminate = lengthSelected > 0 && lengthSelected !== children.length;
    }

    if (this.args.recalculateStateAction) {
      this.args.recalculateStateAction();
    }
  }
}
