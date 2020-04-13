import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class TablesCustomFieldComponent extends Component {
  @tracked editingValue

  @action
  editValue () {
    this.editingValue = true;
    this.newValue = this.args.value;
  }

  @action
  cancelEdit () {
    this.editingValue = false;
  }

  @action
  saveEdit () {
    this.args.onValueChange(this.args.key, this.newValue);
    this.editingValue = false;
  }
}
