import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  classNames: [ 'history__group-item', 'clearfix' ],

  oneOperationInDay: computed.equal('history.length', 1),

  changedKeysList: computed('group.history.@each.changedKeys', function () {
    return this.get('group.history').reduce((arr, hist) => arr.concat(hist.get('changedKeys')), Ember.A()).uniq();
  }),

  shownKeys: computed('changedKeysList.[]', function () {
    return this.get('changedKeysList').slice(0, 2);
  }),

  hiddenKeys: computed('changedKeysList.[]', function () {
    let keys = this.get('changedKeysList');
    return keys.slice(2, keys.get('length'));
  })
});
