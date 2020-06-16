import Route from 'granite/core/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { A } from '@ember/array';
import { resolve } from 'rsvp';

export default class AccountEmployeesMessagesThreadRoute extends Route {
  @service socket
  @service messaging
  @service notifications

  titleToken (model) {
    let names = model.between ? model.between.toArray() : model.thread.between.toArray();
    if (names.length > 2) {
      return `Conversation with ${names[0].firstName} & ${names[1].firstName}`;
    }
    return `Conversation with ${names[0].firstName}`;
  }

  queryParams = { sb: { refreshModel: true } };

  constructor () {
    super(...arguments);
    this.cache_threadRecord = {};
  }

  async model (params = {}) {
    let scrollback = params.sb || false;

    // the message thread
    let thread = await this.getThreadRecord(params);

    const ingressCount = this.controller ? this.controller.ingressPushCount : null;

    let msgQuery = {};

    if (ingressCount && scrollback) {
      msgQuery.skip = ingressCount;
    }

    if (this.controller && !this.controller.model.messages && scrollback) {
      msgQuery.limit = 50 * (scrollback + 1);
      scrollback = false;
    }

    let data = await this.retrieveThreadHistory(thread, scrollback, msgQuery);

    const hist = data.messages,
          existingMessages = this.controller ? this.controller.model.messages : null;

    const messages = existingMessages && scrollback ? hist.concat(existingMessages.toArray()).uniqBy('_id') : A(hist);

    return {
      thread,
      messages,
      count: data.count
    };
  }

  @action
  onMessage ([ message ]) {
    if (!document.hasFocus()) {
      const { content: msg, from } = message || {};

      this.notifications.send(
        `New Message From ${(from.name || {}).first || 'User'}`,
        msg ? msg.length > 40 ? `${msg.substring(0, 40)}...` : msg : message.file ? 'Attachment' : null,
        from.picture || `/api/v1/employee/${from._id}/avatar`
      );
    }

    const controller = this.controller,
          threadId   = controller.model.thread.id;

    if (message.messageThread !== threadId) {
      return;
    }

    controller.model.messages.pushObject(message);
    controller.ingressPushCount = (controller.ingressPushCount || 0) + 1;
  }

  @action
  async getThreadRecord ({ thread_id }) {
    const cache = this.cache_threadRecord[thread_id];
    let thread  = await this.store.findRecord('message-thread', thread_id);

    if (!cache) {
      this.cache_threadRecord[thread_id] = thread;
      return thread;
    }

    return resolve(cache);
  }

  @action
  retrieveThreadHistory (thread, scrollback, q = {}) {
    const socket = this.socket,
          id = thread.id;

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

  @action
  afterModel () {
    this.messaging.subscribe('thread_message', this.onMessage, this, 'thread_controller');
  }

  @action
  resetController (controller, exit, transition) {
    if (exit || !(transition.queryParams || {}).sb) {
      controller.sb = 0;
    }
  }
}
