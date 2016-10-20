import Ember from 'ember';

const { Route, RSVP } = Ember;

export default Route.extend({
  model () {
    return RSVP.hash({
      actionItem: this._super(...arguments),
      actionItems: this.store.query('action-item', {
        completedOn: { $not: { $type: 9 } },
        cancelledOn: { $not: { $type: 9 } }
      }),
      employees: this.store.findAll('employee')
    });
  },
  setupController( controller, model ) {
    controller.setProperties({
      model: model.actionItem,
      actionItems: model.actionItems,
      employees: model.employees
    });
  }
});
