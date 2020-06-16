import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';

export default class MessagingMessageItemComponent extends Component {
  @service messaging
  @service inViewPort

  @tracked __didSendReadUpdate

  get isReadByCurrentUser () {
    return this.__didSendReadUpdate || (this.args.message.readBy || A()).includes(this.args.user.get('id'));
  }

  get isImage () {
    return (this.args.message.file.mimeType || '').indexOf('image/') > -1;
  }

  @action
  didEnterViewport () {
    if (this.isReadByCurrentUser) {
      return;
    }

    this.messaging.markMessageRead(this.args.message);
    this.__didSendReadUpdate = true;
  }
}
