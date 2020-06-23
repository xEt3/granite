import Component from '@glimmer/component';
import { action, computed } from '@ember/object';
import { A } from '@ember/array';
import $ from 'jquery'; //JAMES::STILL USING JQUERY!!

export default class ListItemHistoryGroupComponent extends Component {
  @computed.equal('group.history.length', 1) oneOperationInDay

  get changedKeysList () {
    return this.args.group.history.reduce((arr, hist) => arr.concat(hist.changedKeys), A()).uniq();
  }

  get shownKeys () {
    return this.changedKeysList.slice(0, 2);
  }

  get hiddenKeys () {
    let keys = this.changedKeysList;
    return keys.slice(2, keys.length);
  }

  get actors () {
    return this.args.group.history.reduce((actors, history) => {
      actors.addObject(history.creator);
      return actors;
    }, A());
  }

  @action
  selectGroup () {
    let groupOffset = $('.history__group-date').offset(),
        timelineOffset = 0 - (groupOffset.top - $('.history__timeline .history-timeline__events').offset().top - 200);

    this.args.onSelect(this.args.group, groupOffset, timelineOffset);
  }
}
