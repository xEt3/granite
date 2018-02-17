import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

let DiscussionCommentItemComponent = Component.extend({
  auth: service(),
  classNames: [ 'ui', 'comment' ],

  isOwner: computed('auth.user.employee.id', 'comment.commenter.id', function () {
    return this.get('auth.user.employee.id') === this.get('comment.commenter.id');
  }),

  actions: {
    delete () {
      let comment = this.get('comment'),
          onDelete = this.get('onDelete');

      comment.destroyRecord();

      if ( onDelete && typeof onDelete === 'function' ) {
        onDelete(comment);
      }
    }
  }
});

DiscussionCommentItemComponent.reopenClass({
  positionalParams: [ 'comment' ]
});

export default DiscussionCommentItemComponent;
/* Usage
  {{list-item/discussion-comment-item comment}}
*/
