import classic from 'ember-classic-decorator';
import { classNames } from '@ember-decorators/component';
import Component from '@ember/component';
import { computed, action } from '@ember/object';
import { A } from '@ember/array';
import $ from 'jquery';

@classic
@classNames('history__group-item', 'clearfix')
export default class ListItemHistoryGroupComponent extends Component {
  @computed.equal('group.history.length', 1) oneOperationInDay

  get changedKeysList () {
    return this.group.history.reduce((arr, hist) => arr.concat(hist.changedKeys), A()).uniq();
  }

  get shownKeys () {
    return this.changedKeysList.slice(0, 2);
  }

  get hiddenKeys () {
    let keys = this.changedKeysList;
    return keys.slice(2, keys.length);
  }

  get actors () {
    return this.group.history.reduce((actors, history) => {
      actors.addObject(history.creator);
      return actors;
    }, A());
  }

  @action
  selectGroup () {
    let groupOffset = this.$('.history__group-date').offset(),
        timelineOffset = 0 - (groupOffset.top - $('.history__timeline .history-timeline__events').offset().top - 200);
    this.onSelect(this.group, groupOffset, timelineOffset);
  }
}
