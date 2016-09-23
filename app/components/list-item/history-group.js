import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  classNames: [ 'history__group-item' ],

  oneOperationInDay: computed.equal('history.length', 1),
  changedKeysList: computed('history.@each.changedKeys.[]', function () {
    return this.get('history').reduce((arr, hist) => arr.concat(hist.get('changedKeys')), Ember.A()).uniq();
  }),

  shownKeys: computed('changedKeysList.[]', function () {
    return this.get('changedKeysList').slice(0, 4);
  }),

  hiddenKeys: computed('changedKeysList.[]', function () {
    let keys = this.get('changedKeysList');
    return keys.slice(3, keys.get('length'));
  })
});
