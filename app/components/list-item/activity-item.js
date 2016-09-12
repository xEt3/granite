import Ember from 'ember';
import ajaxStatus from '../../mixins/ajax-status';

const { Component, inject, computed } = Ember;

export default Component.extend(ajaxStatus, {
  auth: inject.service(),
  store: inject.service(),
  classNames: [ 'account__activity-item', 'event' ],

  likeByCurrentUser: computed('auth.user', 'activity.likes.@each.liker', function () {
    return this.get('activity.likes').findBy('liker.id', this.get('auth.user.id'));
  }),

  actions: {
    notify () {
      this.get('onNotify')(...arguments);
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

      console.log(likes);

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
