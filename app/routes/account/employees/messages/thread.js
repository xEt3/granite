import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import { resolve } from 'rsvp';

export default Route.extend({
  socket: service(),
  messaging: service(),
  notifications: service(),

  titleToken (model) {
    let names = model.thread.get('between').toArray();
    if (names.length > 2) {
      return `Conversation with ${names[0].firstName} & ${names[1].firstName}`;
    }
    return `Conversation with ${names[0].firstName}`;
  },

  queryParams: {
    sb: { refreshModel: true }
  },

  init () {
    this._super(...arguments);
    this.set('cache_threadRecord', {});
  },

  model (params = {}) {
    let scrollback = params.sb || false;

    // the message thread
    return this.getThreadRecord(params).then(thread => {
      const ingressCount = this.get('controller.ingressPushCount');

      let msgQuery = {};

      if (ingressCount && scrollback) {
        msgQuery.skip = ingressCount;
      }

      if (!this.get('controller.model.messages') && scrollback) {
        console.log('fresh scrollback')
        msgQuery.limit = 50 * (scrollback + 1);
        scrollback = false;
      }

      return this.retrieveThreadHistory(thread, scrollback, msgQuery).then((data) => {
        const hist = data.messages,
              existingMessages = this.get('controller.model.messages');

        const messages = existingMessages && scrollback ? hist.concat(existingMessages.toArray()).uniqBy('_id') : A(hist);
        console.log('resolve');
        return {
          thread,
          messages,
          count: data.count
        };
      });
    });
  },

  onMessage ([message]) {
    if (!document.hasFocus()) {
      const { content: msg, from } = (message || {});

      this.get('notifications').send(
        `New Message From ${(from.name || {}).first || 'User'}`,
        msg ? msg.length > 40 ? `${msg.substring(0, 40)}...` : msg : message.file ? 'Attachment' : null,
        from.picture || null
      );
    }

    const threadId = this.get('controller.model.thread.id'),
          controller = this.get('controller');

    console.log(message, threadId);

    if (message.messageThread !== threadId) {
      return;
    }

    console.log('got thread message ingress', message);
    controller.get('model.messages').pushObject(message);
    controller.set('ingressPushCount', (controller.get('ingressPushCount') || 0) + 1);
  },

  getThreadRecord ({ thread_id }) {
    const cache = this.get(`cache_threadRecord.${thread_id}`);
    return cache ? resolve(cache) : this.get('store').findRecord('message-thread', thread_id).then(thread => {
      this.set(`cache_threadRecord.${thread_id}`, thread);
      return thread;
    });
  },

  retrieveThreadHistory (thread, scrollback, q = {}) {
    const socket = this.get('socket'),
          id = thread.get('id');

    let messageQuery = Object.assign({ id }, q);

    if (scrollback) {
      messageQuery.page = scrollback;
    }
    console.log('mq', messageQuery);
    const event = socket.emitAndListen(
      'get_thread_history',
      messageQuery,
      'thread_history'
    );

    return event.then(([data]) => {
      console.log(data);
      console.log('promise returned');

      let messages = (data.messages || []).reverse();
      return { messages, count: data.count };
    });
  },

  afterModel () {
    console.log('subscribe');
    this.messaging.subscribe('thread_message', this.onMessage, this, 'thread_controller');
  },

  resetController (controller, exit, transition) {
    console.log('reset trans', transition);
    console.log('reset?', controller, exit);
    if (exit || !(transition.queryParams || {}).sb) {
      console.log('reset controller');
      controller.set('sb', 0);
    }
  }
});
