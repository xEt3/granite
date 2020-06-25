import Component from '@glimmer/component';
import { computed, action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

const contextColorMap = {
  positive: 'text-green',
  negative: 'text-red',
  neutral:  ''
};

export default class ListItemActivityItemComponent extends Component {
  @service auth
  @service data
  @service store

  @tracked comment = null

  commentSort = [ 'created:desc' ]

  @computed.equal('args.activity.context', 'positive') enableLikes
  @computed.sort('args.activity.comments', 'commentSort') comments

  get contextColor () {
    let context = this.args.activity.context;
    return context ? contextColorMap[context] : undefined;
  }

  get likesMinusOne () {
    return (this.args.activity.likes.length || 1) - 1;
  }

  get likeByCurrentUser () {
    return this.args.activity.likes.findBy('liker.id', this.auth.get('user.id'));
  }

  @action
  newComment () {
    this.comment = this.store.createRecord('comment', { commenter: this.auth.get('user.employee') });
  }

  @action
  toggleComments () {
    if (!this.comment) {
      this.newComment();
    }
  }

  @action
  async saveComment () {
    let { success, error } = this.data.createStatus();

    const activity = this.args.activity,
          comment = this.comment,
          comments = activity.comments.content;

    comments.addObject(comment);

    try {
      await activity.save();
      comments.removeObject(comment);
      comment.destroy();
      this.comment = null;
      this.newComment();
      success(null, true);
    } catch (e) {
      error(e);
    }
  }

  @action
  async like () {
    let { success, error } = this.data.createStatus();

    const activity = this.args.activity,
          likes = activity.likes.content,
          currentLike = this.likeByCurrentUser;

    if (currentLike) {
      likes.removeObject(currentLike);
      currentLike.deleteRecord();
    } else {
      var like = this.store.createRecord('like', { liker: this.auth.get('user') });

      likes.addObject(like);
    }

    try {
      await activity.save();
      if (like) {
        like.destroy();
        likes.removeObject(like);
      }

      success(null, true);
    } catch (e) {
      error(e);
    }
  }
}
