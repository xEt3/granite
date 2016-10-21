import Ember from 'ember';
import edit from 'granite/mixins/route-abstractions/edit';

const { Route, RSVP } = Ember;

export default Route.extend(edit, {
  bypassModelHook: true,

  model () {
    let actionItem = this._super(...arguments);

    return RSVP.hash({
      actionItem,
      actionItems: this.store.query('action-item', {
        _id: { $ne: actionItem.get('id') },
        completedOn: { $not: { $type: 9 } },
        cancelledOn: { $not: { $type: 9 } }
      })
    });
  },

  setupController ( controller, model ) {
    controller.setProperties({
      model: model.actionItem,
      actionItems: model.actionItems
    });
  }
});
