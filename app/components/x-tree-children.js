import classic from 'ember-classic-decorator';
import { classNames, tagName } from '@ember-decorators/component';
import Component from '@ember/component';

@classic
@tagName('li')
@classNames('tree-node')
export default class XTreeChildren extends Component {
  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);
    this.recalculateState();
  }

  recalculateState() {
    const children = this.get('model.children');

    if (children && children.length) {
      const lengthSelected = children.filterBy('isChecked', true).length;

      this.set('model.isChecked', lengthSelected > 0);
      this.set('model.isIndeterminate', lengthSelected > 0 && lengthSelected !== children.length);
    }

    if (this.recalculateStateAction) {
      this.recalculateStateAction();
    }
  }
}
