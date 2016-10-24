import Ember from 'ember';

const { Component, inject, computed } = Ember;

export default Component.extend({
  auth: inject.service(),
  userId: computed.reads('auth.user.employee.id'),
  subscriberIds: computed.mapBy('actionItem.subscribers', 'id'),

  todosComplete: computed('actionItem.checklist.length', 'actionItem.incompleteTodos.length', function () {
    let item = this.get('actionItem');
    return item.get('checklist.length') > 0 && item.get('incompleteTodos.length') === 0;
  }),

  actions: {
    toggleSubscription () {
      this.get('onToggleSubscription')(this.get('actionItem'));
    }
  }
});
