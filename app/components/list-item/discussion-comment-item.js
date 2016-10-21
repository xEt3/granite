import Ember from 'ember';

const { Component, inject, computed } = Ember;

let DiscussionCommentItemComponent = Component.extend({
  auth: inject.service(),
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
