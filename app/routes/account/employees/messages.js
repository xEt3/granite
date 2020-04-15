import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import refreshable from 'granite/mixins/refreshable';
import { hash, map } from 'rsvp';

@classic
export default class MessagesRoute extends Route.extend(refreshable) {
  @service
  auth;

  @service
  ajax;

  @service
  socket;

  @service
  notifications;

  title(tokens) {
    if (tokens.length > 0) {
      return tokens.join();
    }

    return tokens.join(' - ') + 'Messaging - HR Self Service';
  }

  beforeModel() {
    this.socket.initialize();
    this.notifications.requestPermission();
  }

  model() {
    // all message threads,
    // all available employees (except self)
    return hash({
      threads: this.store.findAll('message-thread')
      .then(result => map(result.toArray(), (thread) => {
        return hash({
          lastMessage: this.store.query('message', {
            limit:         1,
            messageThread: thread.get('id'),
            sort:          { created: -1 }
          }),

          unreadCount: this.ajax.request('/api/v1/messages', {
            data: {
              _count:        true,
              messageThread: thread.get('id'),
              readBy:        { $nin: [ this.get('auth.user.employee.id') ] }
            }
          })
        }).then(results => {
          thread.set('lastMessage', results.lastMessage.get('firstObject'));
          thread.set('someUnread', !!results.unreadCount.count);
          return thread;
        });
      })),
      user:      this.get('auth.user.employee'),
      employees: this.store.query('employee', {
        _id:          { $nin: [ this.get('auth.user.employee.id') ] },
        terminatedOn: { $not: { $type: 9 } },
        sort:         { 'name.first': 1 }
      })
    });
  }

  setupController(controller, model) {
    controller.setProperties({
      model:        model.threads,
      allEmployees: model.employees,
      user:         model.user
    });
  }
}
