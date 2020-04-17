import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class DisplayFilterPane extends Component {
  @action
  sendComponentUpdate (path, value) {
    this.args.onChange(path, value);
  }

  @action
  resetFilter (path) {
    this.sendComponentUpdate(path, undefined);
  }
}
