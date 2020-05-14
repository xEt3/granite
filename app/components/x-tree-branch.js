import Component from '@glimmer/component';
import { action } from '@ember/object';
import layout from '../templates/components/x-tree-branch';

export default class XTreeBranch extends Component {
  layout = layout

  @action
  recalculateState () {
    if (this.recalculateStateAction) {
      this.args.recalculateStateAction();
    }
  }
}
