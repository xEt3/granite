import Controller from 'granite/core/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { htmlSafe } from '@ember/string';

export default class HistoryController extends Controller {
  @tracked timelineOffset
  @tracked selectedGroup
  @tracked groupDisplayOffset

  get timelineStyle () {
    let offset = this.timelineOffset;
    return htmlSafe(offset ? `transform: translate(0, ${offset}px);` : '');
  }

  @action
  selectGroup (selectedGroup, groupDisplayOffset, timelineOffset) {
    this.setProperties({
      selectedGroup,
      groupDisplayOffset,
      timelineOffset
    });
  }

  @action
  deselectGroup () {
    this.setProperties({
      selectedGroup:      null,
      groupDisplayOffset: null,
      timelineOffset:     null
    });
  }
}
