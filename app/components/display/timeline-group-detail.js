import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class DisplayTimelineGroupDetail extends Component {
  @action
  deselectGroup () {
    this.args.onDeselect();
  }
}
