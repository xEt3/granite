import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class XTreeBranch extends Component {
  @action
  recalculateState () {
    if (this.recalculateStateAction) {
      this.args.recalculateStateAction();
    }
  }
}
