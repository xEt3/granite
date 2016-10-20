import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  todosComplete: computed('actionItem.checklist.length', 'actionItem.incompleteTodos.length', function () {
    let item = this.get('actionItem');
    return item.get('checklist.length') > 0 && item.get('incompleteTodos.length') === 0;
  })
});
