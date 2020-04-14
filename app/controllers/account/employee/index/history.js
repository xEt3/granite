import classic from 'ember-classic-decorator';
import { action, computed } from '@ember/object';
import Controller from '@ember/controller';
import { htmlSafe } from '@ember/string';

@classic
export default class HistoryController extends Controller {
  @computed('timelineOffset')
  get timelineStyle() {
    let offset = this.get('timelineOffset');
    return htmlSafe(offset ? `transform: translate(0, ${offset}px);` : '');
  }

  @action
  selectGroup(selectedGroup, groupDisplayOffset, timelineOffset) {
    this.setProperties({
      selectedGroup,
      groupDisplayOffset,
      timelineOffset
    });
  }

  @action
  deselectGroup() {
    this.setProperties({
      selectedGroup:      null,
      groupDisplayOffset: null,
      timelineOffset:     null
    });
  }
}
