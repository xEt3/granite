import classic from 'ember-classic-decorator';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

@classic
export default class ThreadController extends Controller {
  @service
  socket;

  queryParams = [ 'sb' ];
  sb = 0;

  @computed('model.{count,messages.length}')
  get retrievalMax () {
    const msgLen = this.get('model.messages.length');
    return this.get('model.count') === msgLen || msgLen > 3000;
  }

  @action
  sendMessage (message, file) {
    if (!message && !file) {
      return;
    }

    this.socket.emit('thread_message', {
      message,
      file:   file && file._id,
      thread: this.get('model.thread.id')
    });
  }

  @action
  scrollback () {
    this.incrementProperty('sb');
  }
}
