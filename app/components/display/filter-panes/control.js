import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class ControlComponent extends Component {
  get hasNull () {
    return typeof this.args.hasNull === 'boolean' ? this.args.hasNull : true;
  }

  get itemValuePath () {
    return this.args.itemValuePath === false ? false : this.args.itemValuePath || 'id';
  }

  get selectionClass () {
    if (this.args.type !== 'select') {
      return '';
    }

    let classText = 'selection';

    if (this.args.multi) {
      classText = `multiple ${classText}`;
    }

    if (this.args.searchable) {
      classText = `search ${classText}`;
    }

    return classText;
  }

  @action
  update (val) {
    this.args.update(this.args.name, val);
  }
}
