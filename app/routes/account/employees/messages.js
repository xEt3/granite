import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash, map } from 'rsvp';

export default Route.extend({
  auth: service(),
  ajax: service(),
  socket: service(),
  notifications: service(),
  title (tokens) {
    if (tokens.length > 0) {
      return tokens.join();
    }

    return tokens.join(' - ') + 'Messaging - HR Self Service';
  },

  beforeModel () {
    this.get('socket').initialize();
    this.notifications.requestPermission();
  },

  model () {
    // all message threads,
    // all available employees (except self)
    return hash({
      threads: this.store.findAll('message-thread')
      .then(result => map(result.toArray(), (thread) => {
        console.log('result:', result);
        return hash({
          lastMessage: this.get('store').query('message', {
            limit: 1,
            messageThread: thread.get('id'),
            sort: { created: -1 }
          }),

          unreadCount: this.get('ajax').request('/api/v1/messages', {
            data: {
              _count: true,
              messageThread: thread.get('id'),
              readBy: { $nin: [ this.get('auth.user.id') ] }
            }
          })
        }).then(result => {
          thread.set('lastMessage', result.lastMessage.get('firstObject'));
          thread.set('someUnread', !!result.unreadCount.count);
          return thread;
        });
      })),
      user: this.get('auth.user'),
      employees: this.store.query('employee', {
        _id: { $nin: [ this.get('auth.userId') ] },
        sort: {
          'name.last': 1
        }
      })
    });
  },

  setupController (controller, model) {
    // console.log('model in route:', model);
    controller.setProperties({
      model: model.threads,
      allEmployees: model.employees,
      user: model.user
    });
  }
});
