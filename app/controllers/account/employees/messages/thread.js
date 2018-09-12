import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
  socket: service(),

  queryParams: [ 'sb' ],
  sb:          0,

  retrievalMax: computed('model.{count,messages.length}', function () {
    const msgLen = this.get('model.messages.length');
    return this.get('model.count') === msgLen || msgLen > 3000;
  }),

  actions: {
    sendMessage (message, file) {
      if (!message && !file) {
        return;
      }

      this.get('socket').emit('thread_message', {
        message,
        file:   file && file._id,
        thread: this.get('model.thread.id')
      });
    },

    scrollback () {
      this.incrementProperty('sb');
    }
  }
});
