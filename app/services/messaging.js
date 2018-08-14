import Service, { inject as service } from '@ember/service';
import { debounce } from '@ember/runloop';
import { A } from '@ember/array';

export default Service.extend({
  socket: service(),

  queueDrainTimeout: 800,
  __readQueue: A(),

  markMessageRead (message) {
    this.__readQueue.push(message._id);
    debounce(this, this.__drainReadQueue, this.queueDrainTimeout);
  },

  __drainReadQueue () {
    let ids = this.__readQueue.toArray();
    this.socket.emit('message_read', { ids });
    this.__readQueue.removeObjects(ids);
  },

  subscribe (event, fn, context, key) {
    const listenersKey = `${event}__listeners`;

    if (!this.get(listenersKey)) {
      this.set(listenersKey, {});
    }

    let listenerKey = key || Math.round(Math.random() * 10000);

    this.set(`${listenersKey}.${listenerKey}`, fn.bind(context));

    if (!this.get(`${event}__subscribed`)) {
      this.__initializeSubscription(event);
    }

    return listenerKey;
  },

  unsubscribe (event, key) {
    if (!key) {
      throw new Error('Listener key is required.');
    }

    const listenersKey = `${event}__listeners`;

    if (!this.get(listenersKey)) {
      return;
    }

    this.set(`${listenersKey}.${key}`, undefined);
  },

  __initializeSubscription (event) {
    this.set(`${event}__subscribed`, true);

    this.socket.on(event, (...args) => {
      let listeners = this.get(`${event}__listeners`) || {};

      Object.keys(listeners).forEach(key => {
        listeners[key](args);
      });
    });
  }
});
