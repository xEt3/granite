import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import edit from 'granite/mixins/route-abstractions/edit';

export default Route.extend(edit, {
  titleToken: 'Edit',
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
