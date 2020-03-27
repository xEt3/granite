import Component from '@ember/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ListItemDiscussionCommentItemComponent extends Component {
  @service auth
  classNames = [ 'ui', 'comment' ]

  get isOwner () {
    return this.auth.user.employee.id === this.comment.commenter.id;
    //COMMENT FOR LATER... IS THIS EVEN USED??
  }

  @action
  delete () {
    this.comment.destroyRecord();

    if (this.onDelete && typeof onDelete === 'function') {
      this.onDelete(this.comment);
    }
  }
}
