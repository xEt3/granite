import Component from '@glimmer/component';
import layout from '../templates/components/x-tree';
import { getDescendents, getAncestors } from '../utils/tree';
import { get, set }  from '@ember/object';

export default class XTreeComponent extends Component {
  layout = layout

  constructor () {
    super(...arguments);
    let tree = this.args.model;

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
