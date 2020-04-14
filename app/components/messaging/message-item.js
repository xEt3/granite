import classic from 'ember-classic-decorator';
import { classNames } from '@ember-decorators/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { A } from '@ember/array';
import inViewportMixin from 'ember-in-viewport';

@classic
@classNames('item', 'message')
class MessageItemComponent extends Component.extend(inViewportMixin) {
  @service
  messaging;

  @computed('message.readBy.[]', '__didSendReadUpdate', 'user')
  get isReadByCurrentUser() {
    return this.__didSendReadUpdate || (this.message.readBy || A()).includes(this.user.get('id'));
  }

  @computed('message.file.mimeType')
  get isImage() {
    return (this.get('message.file.mimeType') || '').indexOf('image/') > -1;
  }

  didEnterViewport() {
    if (this.isReadByCurrentUser) {
      return;
    }

    this.messaging.markMessageRead(this.message);
    this.__didSendReadUpdate = true;
  }
}

MessageItemComponent.reopenClass({ positionalParams: [ 'message' ] });

export default MessageItemComponent;
