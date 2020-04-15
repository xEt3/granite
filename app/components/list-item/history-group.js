import Component from '@ember/component';
import { computed } from '@ember/object';
import { A } from '@ember/array';
import $ from 'jquery';

export default Component.extend({
  classNames: [ 'history__group-item', 'clearfix' ],

  oneOperationInDay: computed.equal('group.history.length', 1),

  changedKeysList: computed('group.history.@each.changedKeys', function () {
    return this.get('group.history').reduce((arr, hist) => arr.concat(hist.get('changedKeys')), A()).uniq();
  }),

  shownKeys: computed('changedKeysList.[]', function () {
    return this.changedKeysList.slice(0, 2);
  }),

  hiddenKeys: computed('changedKeysList.[]', function () {
    let keys = this.changedKeysList;
    return keys.slice(2, keys.get('length'));
  }),

  actors: computed('group.history.@each.creator', function () {
    return this.get('group.history').reduce((actors, history) => {
      actors.addObject(history.get('creator'));
      return actors;
    }, A());
  }),

  actions: {
    selectGroup () {
      let groupOffset = this.$('.history__group-date').offset(),
          timelineOffset = 0 - (groupOffset.top - $('.history__timeline .history-timeline__events').offset().top - 200);
      this.onSelect(this.group, groupOffset, timelineOffset);
    }
  }
});
