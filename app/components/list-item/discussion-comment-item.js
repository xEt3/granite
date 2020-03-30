import Component from '@ember/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ListItemDiscussionCommentItemComponent extends Component {
  @service auth
  classNames = [ 'ui', 'comment' ]

  @action
  delete () {
    this.comment.destroyRecord();

    if (this.onDelete && typeof onDelete === 'function') {
      this.onDelete(this.comment);
    }
  }
}
