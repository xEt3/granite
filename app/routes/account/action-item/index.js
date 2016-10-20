import Ember from 'ember';

const { Route, RSVP } = Ember;

export default Route.extend({
  model() {
    let actionItem = this.modelFor('account.action-item');

    return RSVP.hash({
      actionItem,
      //dependents are other action-items that are
      //waiting on this action item
      dependents: this.store.query('action-item', {
        prerequisites: { $in: [ actionItem.get('id') ] }
      })
    });
  },

  setupController ( controller, model ) {
    controller.setProperties({
      model: model.actionItem,
      dependents: model.dependents
    });
  }
});
