import Ember from 'ember';
import refreshable from 'granite/mixins/refreshable';

const { Route, RSVP } = Ember;

export default Route.extend(refreshable, {
  model () {
    let actionItem = this.modelFor('account.action-item');

    return RSVP.hash({
      actionItem,
      comments: this.store.query('comment', {
        targetId: actionItem.get('id'),
        sort: { created: -1 }
      })
    });
  },

  setupController (controller, model) {
    controller.setProperties({
      model: model.comments,
      actionItem: model.actionItem
    });
  }
});
