import Route from 'granite/core/route';
import { inject as service } from '@ember/service';
import { all } from 'rsvp';

export default class AccountEmployeesMessagesRoute extends Route {
  @service auth
  @service ajax
  @service socket
  @service notifications

  title (tokens) {
    if (tokens.length > 0) {
      return tokens.join();
    }

    return tokens.join(' - ') + 'Messaging - HR Self Service';
  }

  beforeModel () {
    this.socket.initialize();
    this.notifications.requestPermission();
  }

  async model () {
    // all message threads,
    // all available employees (except self)
    let threadResults = await this.store.findAll('message-thread');

    let threads = await all(threadResults.map(async (thread) => {
      let results = {
        lastMessage: await this.store.query('message', {
          limit:         1,
          messageThread: thread.id,
          sort:          { created: -1 }
        }),

        unreadCount: await this.ajax.request('/api/v1/messages', {
          data: {
            _count:        true,
            messageThread: thread.id,
            readBy:        { $nin: [ this.auth.get('user.employee.id') ] }
          }
        })
      };

      thread.lastMessage = results.lastMessage.firstObject;
      thread.someUnread = !!results.unreadCount.count;

      return thread;
    }));

    return {
      threads,
      user:      await this.auth.get('user.employee'),
      employees: await this.store.query('employee', {
        _id:          { $nin: [ this.auth.get('user.employee.id') ] },
        terminatedOn: { $not: { $type: 9 } },
        sort:         { 'name.first': 1 }
      })
    };
  }

  setupController (controller, model) {
    controller.setProperties({
      model:        model.threads,
      allEmployees: model.employees,
      user:         model.user
    });
  }
}
