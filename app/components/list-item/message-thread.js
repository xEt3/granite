import Component from '@glimmer/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ListItemMessageThread extends Component {
  @service messaging
  @service router

  @computed.or('__lastMessage', 'model.lastMessage') lastMsg

  get active () {
    return this.router.currentURL === `/messages/thread/${this.args.model.id}`;
  }

  get linkClass () {
    return `ui ${this.args.model.someUnread ? '' : 'secondary'} segment messaging__message-thread-item ${this.active ? 'active' : ''}`;
  }

  constructor () {
    super(...arguments);
    this.id = Math.round(Math.random() * 10000);
    this.messaging.subscribe('thread_message', this.onMessage, this, this.id);
  }

  willDestroy () {
    super.willDestroy(...arguments);
    this.messaging.unsubscribe('thread_message', this.id);
  }

  onMessage ([ message ]) {
    if (message.messageThread !== this.args.model.id) {
      return;
    }

    this.__lastMessage = message;
  }

  get participantsCondensed () {
    const participants = this.args.model.between,
          isLong = this.isLongParticipantList;

    let allButMe = participants.filter(x => x.id !== this.args.user.id),
        remainingLength;

    if (isLong) {
      remainingLength = allButMe.length - 2;
      allButMe = allButMe.slice(0, 2);
    }

    return `${allButMe.mapBy('fullName').join(', ')}${isLong ? ' and ' + remainingLength + ' others' : ''}`;
  }

  get isLongParticipantList () {
    return this.args.model.between.length > 3;
  }
}
