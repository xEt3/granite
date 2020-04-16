import Component from '@glimmer/component';

export default class DisplayFilterPane extends Component {
  sendComponentUpdate (path, value) {
    this.args.onChange(path, value);
  }

  resetFilter (path) {
    this.sendComponentUpdate(path, undefined);
  }
}
