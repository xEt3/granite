import BaseListItem from './base';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default BaseListItem.extend({
  messaging: service(),
  router:    service(),
  tagName:   '',

  lastMsg: computed.or('__lastMessage', 'model.lastMessage'),

  active: computed('router.currentURL', 'model.id', function () {
    return this.get('router.currentURL') === `/messages/thread/${this.get('model.id')}`;
  }),

  linkClass: computed('active', function () {
    return `ui ${this.get('model.someUnread') ? '' : 'secondary'} segment messaging__message-thread-item ${this.active ? 'active' : ''}`;
  }),

  init () {
    this._super(...arguments);
    this.id = Math.round(Math.random() * 10000);
    this.messaging.subscribe('thread_message', this.onMessage, this, this.id);
  },


  willDestroy () {
    this._super(...arguments);
    this.messaging.unsubscribe('thread_message', this.id);
  },

  onMessage ([ message ]) {
    if (message.messageThread !== this.get('model.id')) {
      return;
    }

    this.set('__lastMessage', message);
  },

  participantsCondensed: computed('model.between.[]', 'isLongParticipantList', function () {
    const participants = this.get('model.between'),
          isLong = this.isLongParticipantList;

    let allButMe = participants.filter(x => x.get('id') !== this.get('user.id')),
        remainingLength;

    if (isLong) {
      remainingLength = allButMe.get('length') - 2;
      allButMe = allButMe.slice(0, 2);
    }

    return `${allButMe.mapBy('fullName').join(', ')}${isLong ? ' and ' + remainingLength + ' others' : ''}`;
  }),

  isLongParticipantList: computed('model.between.[]', function () {
    return this.get('model.between.length') > 3;
  })
});
