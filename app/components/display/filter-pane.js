import classic from 'ember-classic-decorator';
import Component from '@ember/component';

@classic
export default class FilterPane extends Component {
  sendComponentUpdate (path, value) {
    this.onChange(path, value);
  }

  resetFilter (path) {
    this.sendComponentUpdate(path, undefined);
  }
}
