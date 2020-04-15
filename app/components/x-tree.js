import classic from 'ember-classic-decorator';
import { layout as templateLayout } from '@ember-decorators/component';
import Component from '@ember/component';
import layout from '../templates/components/x-tree';
import { getDescendents, getAncestors } from '../utils/tree';
import { get, set }  from '@ember/object';

@classic
@templateLayout(layout)
export default class XTree extends Component {
  init() {
    super.init(...arguments);
    let tree = this.model;

    // Make sure chosen item is highlighted and expanded-to in the tree
    let chosenId = this.chosenId;
    if (chosenId) {
      let chosen = getDescendents(tree).findBy('id', chosenId);
      if (chosen) {
        getAncestors(tree, chosen).forEach(x => {
          if (get(x, 'id') !== chosenId) {
            set(x, 'isExpanded', true);
          }
        });
      }
    }

    // Expand to given depth
    let expandDepth = this.expandDepth;
    if (expandDepth) {
      getDescendents(tree, expandDepth).setEach('isExpanded', true);
    }
  }
}
