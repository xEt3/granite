import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class AccountActionItemDiscussionController extends Controller {
  @service auth
  @service data

  transitionAfterSave = false

  @action
  async comment () {
    let text = this.commentText,
        commenter = this.get('auth.user.employee');

    this.set('commentText', null);

    let comment = this.store.createRecord('comment', {
      commenter,
      text,
      targetId:   this.get('actionItem.id'),
      targetType: 'ActionItem'
    });

    await this.data.saveRecord(comment);
    this.send('refreshModel');
  }
}
