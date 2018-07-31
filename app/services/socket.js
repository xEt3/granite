import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import { Promise } from 'rsvp';
import { camelize } from '@ember/string';

export default Service.extend({
  auth: service(),
  connectedUsers: A(),

  initialize () {
    if (this.get('socketIsInitialized')) {
      return;
    }

    const socket = io({
      query: {
        user: this.get('auth.user.employee.id')
      }
    });
    console.log('socket?', socket);

    this.setProperties({
      socket,
      socketIsInitialized: true
    });

    this.__bindEvents(socket);
  },

  disconnect () {
    this.get('socket').disconnect();

    this.setProperties({
      socket: null,
      socketIsInitialized: false
    });
  },

  emit (event, data) {
    const socket = this.get('socket');
    console.log('emitting', event, data);
    socket.emit(event, data);
  },

  emitAndListen (event, data, listenEvent) {
    this.emit(event, data);
    return this.listen(listenEvent);
  },

  listen (event = '') {
    const listenersKey = `__${event.replace(' ', '_')}_listeners`;

    if (!this.get(listenersKey)) {
      this.set(listenersKey, A());
    }

    return new Promise(resolve => {
      this.get(listenersKey).push(resolve);
    });
  },

  on (event, fn) {
    this.get('socket').on(event, fn);
  },

  __internalEmit (event = '', ...args) {
    const method = this.get(`on${camelize(event)}`);

    if (method) {
      method(args);
    }
    console.log('emit args?', args);
    // remove listener?

    const listenersKey = `__${event.replace(' ', '_')}_listeners`,
          listeners = this.get(listenersKey);

    console.log('listeners are', listeners);

    (listeners || A()).forEach(resolvePromise => resolvePromise(args));
    this.set(listenersKey, A());
  },

  __bindEvents (socket) {
    socket.on('thread_history', (messages) => {
      console.log('getting thread history', messages);
      this.__internalEmit('thread_history', messages);
    });

    socket.on('user_list', (users) => {
      this.__internalEmit('user_list', users);
      this.set('connectedUsers', A(users));
    });

    socket.on('user_connect', (user) => {
      this.__internalEmit('user_connect', user);
      this.get('connectedUsers').addObject(user);
    });

    socket.on('user_disconnect', (user) => {
      this.__internalEmit('user_disconnect', user);
      this.get('connectedUsers').removeObject(user);
    });
  }
});
