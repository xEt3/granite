import classic from 'ember-classic-decorator';
import { classNames, tagName, layout as templateLayout } from '@ember-decorators/component';
import Component from '@ember/component';
import layout from '../templates/components/x-tree-branch';

@classic
@templateLayout(layout)
@tagName('ul')
@classNames('tree-branch')
export default class XTreeBranch extends Component {
  recalculateState() {
    if (this.recalculateStateAction) {
      this.recalculateStateAction();
    }
  }
}
