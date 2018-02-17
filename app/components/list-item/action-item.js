import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  auth: service(),
  userId: computed.reads('auth.user.employee.id'),
  subscriberIds: computed.mapBy('actionItem.subscribers', 'id'),

  todosComplete: computed('actionItem.{checklist.length,incompleteTodos.length}', function () {
    let item = this.get('actionItem');
    return item.get('checklist.length') > 0 && item.get('incompleteTodos.length') === 0;
  }),

  actions: {
    toggleSubscription () {
      this.get('onToggleSubscription')(this.get('actionItem'));
    }
  }
});
