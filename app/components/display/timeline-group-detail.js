import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { classNames } from '@ember-decorators/component';
import Component from '@ember/component';

@classic
@classNames('history-timeline__detail', 'clearfix')
export default class TimelineGroupDetail extends Component {
  @action
  deselectGroup() {
    this.get('onDeselect')();
  }
}
