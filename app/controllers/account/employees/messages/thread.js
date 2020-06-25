import Controller from 'granite/core/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class AccountEmployeesMessagesThreadController extends Controller {
  @service socket
  @tracked sb = 0

  queryParams = [ 'sb' ]

  get retrievalMax () {
    const msgLen = this.model.messages.length;
    return this.model.count === msgLen || msgLen > 3000;
  }

  @action
  sendMessage (message, file) {
    if (!message && !file) {
      return;
    }

    this.socket.emit('thread_message', {
      message,
      file:   file && file._id,
      thread: this.model.thread.id
    });
  }

  @action
  scrollback () {
    this.incrementProperty('sb');
  }
}
