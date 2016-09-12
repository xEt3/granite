import Ember from 'ember';
import ajaxStatus from '../../mixins/ajax-status';

const { Component, inject, computed } = Ember;

const contextColorMap = {
  positive: 'text-green',
  negative: 'text-red',
  neutral: ''
};

export default Component.extend(ajaxStatus, {
  auth: inject.service(),
  store: inject.service(),
  classNames: [ 'account__activity-item', 'event' ],

  enableLikes: computed.equal('activity.context', 'positive'),

  contextColor: computed('activity.context', function () {
    let context = this.get('activity.context');
    return context ? contextColorMap[context] : undefined;
  }),

  likesMinusOne: computed('activity.likes.length', function () {
    return (this.get('activity.likes.length') || 1) - 1;
  }),

  likeByCurrentUser: computed('auth.user', 'activity.likes.@each.liker', function () {
    return this.get('activity.likes').findBy('liker.id', this.get('auth.user.id'));
  }),

  actions: {
    notify () {
      this.get('onNotify')(...arguments);
    },

    toggleComments () {
      if ( !this.get('comment') ) {
        this.set('comment', this.get('store').createRecord('comment', {
          commenter: this.get('auth.user')
        }));
      }

      this.toggleProperty('showComments');
    },

    saveComment () {
      this.ajaxStart();

      const activity = this.get('activity'),
            comment = this.get('comment'),
            comments = activity.get('comments.content');

      comments.addObject(comment);

      activity.save()
      .then(() => {
        comment.destroy();
        this.set('comment', null);
        this.ajaxSuccess(null, true);
      })
      .catch(this.ajaxError.bind(this));
    },

    like () {
      this.ajaxStart();

      const activity = this.get('activity'),
            likes = activity.get('likes.content'),
            currentLike = this.get('likeByCurrentUser');

      if ( currentLike ) {
        likes.removeObject(currentLike);
        currentLike.deleteRecord();
      } else {
        var like = this.get('store').createRecord('like', {
          liker: this.get('auth.user')
        });

        likes.addObject(like);
      }

      activity.save()
      .then(() => {
        if ( like ) {
          like.destroy();
        }

        this.ajaxSuccess(null, true);
      })
      .catch(this.ajaxError.bind(this));
    }
  }
});
