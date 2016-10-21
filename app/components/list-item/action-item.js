import Ember from 'ember';

const { Component, inject, computed } = Ember;

export default Component.extend({
  auth: inject.service(),

  todosComplete: computed('actionItem.checklist.length', 'actionItem.incompleteTodos.length', function () {
    let item = this.get('actionItem');
    return item.get('checklist.length') > 0 && item.get('incompleteTodos.length') === 0;
  }),

  subscribed: computed('actionItem.subscribers.[]', 'auth.user.employee.id', function () {
    return this.get('actionItem.subscribers').filterBy('id', this.get('auth.user.employee.id'));
  }),

  actions: {
    toggleSubscription () {
      this.get('onToggleSubscription')(this.get('actionItem'));
    }
  }
});
