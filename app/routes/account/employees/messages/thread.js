import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import { A } from '@ember/array';
import { resolve } from 'rsvp';

@classic
export default class ThreadRoute extends Route {
  @service
  socket;

  @service
  messaging;

  @service
  notifications;

  titleToken(model) {
    let names = model.between ? model.between.toArray() : model.thread.between.toArray();
    if (names.length > 2) {
      return `Conversation with ${names[0].firstName} & ${names[1].firstName}`;
    }
    return `Conversation with ${names[0].firstName}`;
  }

  queryParams = { sb: { refreshModel: true } };

  init() {
    super.init(...arguments);
    this.set('cache_threadRecord', {});
  }

  model(params = {}) {
    let scrollback = params.sb || false;

    // the message thread
    return this.getThreadRecord(params).then(thread => {
      const ingressCount = this.get('controller.ingressPushCount');

      let msgQuery = {};

      if (ingressCount && scrollback) {
        msgQuery.skip = ingressCount;
      }

      if (!this.get('controller.model.messages') && scrollback) {
        msgQuery.limit = 50 * (scrollback + 1);
        scrollback = false;
      }

      return this.retrieveThreadHistory(thread, scrollback, msgQuery).then((data) => {
        const hist = data.messages,
              existingMessages = this.get('controller.model.messages');

        const messages = existingMessages && scrollback ? hist.concat(existingMessages.toArray()).uniqBy('_id') : A(hist);

        return {
          thread,
          messages,
          count: data.count
        };
      });
    });
  }

  onMessage([ message ]) {
    if (!document.hasFocus()) {
      const { content: msg, from } = message || {};

      this.notifications.send(
        `New Message From ${(from.name || {}).first || 'User'}`,
        msg ? msg.length > 40 ? `${msg.substring(0, 40)}...` : msg : message.file ? 'Attachment' : null,
        from.picture || `/api/v1/employee/${from._id}/avatar`
      );
    }

    const threadId = this.get('controller.model.thread.id'),
          controller = this.controller;

    if (message.messageThread !== threadId) {
      return;
    }

    controller.get('model.messages').pushObject(message);
    controller.set('ingressPushCount', (controller.ingressPushCount || 0) + 1);
  }

  getThreadRecord({ thread_id }) {
    const cache = this.get(`cache_threadRecord.${thread_id}`);
    return cache ? resolve(cache) : this.store.findRecord('message-thread', thread_id).then(thread => {
      this.set(`cache_threadRecord.${thread_id}`, thread);
      return thread;
    });
  }

  retrieveThreadHistory(thread, scrollback, q = {}) {
    const socket = this.socket,
          id = thread.get('id');

    let messageQuery = Object.assign({ id }, q);

    if (scrollback) {
      messageQuery.page = scrollback;
    }

    const event = socket.emitAndListen(
      'get_thread_history',
      messageQuery,
      'thread_history'
    );

    return event.then(([ data ]) => {
      let messages = (data.messages || []).reverse();
      return {
        messages,
        count: data.count
      };
    });
  }

  afterModel() {
    this.messaging.subscribe('thread_message', this.onMessage, this, 'thread_controller');
  }

  resetController(controller, exit, transition) {
    if (exit || !(transition.queryParams || {}).sb) {
      controller.set('sb', 0);
    }
  }
}
