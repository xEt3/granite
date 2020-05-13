import Component from '@glimmer/component';
import { action } from '@ember/object';
// import { classNames, tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../templates/components/x-tree-branch';

// @templateLayout(layout)

export default class XTreeBranch extends Component {
  layout = layout

  @action
  recalculateState () {
    if (this.recalculateStateAction) {
      this.args.recalculateStateAction();
    }
  }
}
