import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import refreshable from 'granite/mixins/refreshable';

export default Route.extend(refreshable, {
  titleToken: 'Discussion',

  model () {
    let actionItem = this.modelFor('account.action-item');

    return RSVP.hash({
      actionItem,
      comments: this.store.query('comment', {
        targetId: actionItem.get('id'),
        sort:     { created: -1 }
      })
    });
  },

  setupController (controller, model) {
    controller.setProperties({
      model:      model.comments,
      actionItem: model.actionItem
    });
  }
});
