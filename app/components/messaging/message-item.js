import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import inViewportMixin from 'ember-in-viewport';

const MessageItemComponent = Component.extend(inViewportMixin, {
  messaging: service(),

  classNames: [ 'item', 'message' ],

  isReadByCurrentUser: computed('message.readBy.[]', '__didSendReadUpdate', 'user', function () {
    return this.__didSendReadUpdate || (this.message.readBy || A()).includes(this.user.get('id'));
  }),

  isImage: computed('message.file.mimeType', function () {
    return (this.get('message.file.mimeType') || '').indexOf('image/') > -1;
  }),

  didEnterViewport () {
    if (this.isReadByCurrentUser) {
      return;
    }

    this.messaging.markMessageRead(this.message);
    this.__didSendReadUpdate = true;
  }
});

MessageItemComponent.reopenClass({
  positionalParams: [ 'message' ]
});

export default MessageItemComponent;
